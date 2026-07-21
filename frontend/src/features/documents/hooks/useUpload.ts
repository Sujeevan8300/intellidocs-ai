import { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { App } from 'antd'
import type { AppDispatch } from '../../../store'
import {
  uploadDocument,
  addUploadToQueue,
  updateUploadProgress,
  removeUploadFromQueue,
} from '../slices/documentSlice'
import { SUPPORTED_FILE_TYPES, SUPPORTED_EXTENSIONS, MAX_FILE_SIZE } from '../constants/document.constants'
import type { UploadFile } from '../types/Upload'

export function useUpload() {
  const dispatch = useDispatch<AppDispatch>()
  const { notification } = App.useApp()
  const counterRef = useRef(0)

  const validateFile = useCallback((file: File): string | null => {
    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      const ext = file.name.substring(file.name.lastIndexOf('.'))
      if (!SUPPORTED_EXTENSIONS.includes(ext.toLowerCase())) {
        return `File type "${ext}" is not supported. Please upload PDF, DOCX, TXT, or Markdown files.`
      }
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds the ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB limit.`
    }
    return null
  }, [])

  const startUpload = useCallback(
    async (file: File, metadata: { name: string; category: string; description: string; tags: string[] }) => {
      const uploadId = `upload-${++counterRef.current}-${Date.now()}`

      const uploadFile: UploadFile = {
        id: uploadId,
        file,
        name: metadata.name || file.name,
        category: metadata.category,
        description: metadata.description,
        tags: metadata.tags,
        fileType: file.name.split('.').pop()?.toUpperCase() ?? 'PDF',
        fileSize: file.size,
        status: 'uploading',
        progress: 0,
      }

      dispatch(addUploadToQueue(uploadFile))

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        dispatch((_, getState) => {
          const queue = getState().documents.uploadQueue
          const current = queue.find((u) => u.id === uploadId)
          if (!current || current.status === 'cancelled') {
            clearInterval(progressInterval)
            return
          }
          const newProgress = Math.min(current.progress + Math.random() * 20, 95)
          dispatch(updateUploadProgress({ id: uploadId, progress: newProgress, status: 'uploading' }))
        })
      }, 400)

      try {
        const request = {
          name: metadata.name || file.name,
          category: metadata.category,
          description: metadata.description,
          tags: metadata.tags,
          fileType: file.name.split('.').pop()?.toUpperCase() ?? 'PDF',
          fileSize: file.size,
        }

        const result = await dispatch(uploadDocument({ request, file })).unwrap()

        clearInterval(progressInterval)
        dispatch(updateUploadProgress({ id: uploadId, progress: 100, status: 'complete' }))

        notification.success({
          message: 'Upload successful',
          description: `"${result.name}" has been uploaded and is ready for processing.`,
          placement: 'topRight',
        })

        return result
      } catch (err) {
        clearInterval(progressInterval)
        dispatch(updateUploadProgress({ id: uploadId, progress: 0, status: 'error' }))
        notification.error({
          message: 'Upload failed',
          description: (err as string) || 'Something went wrong during upload.',
          placement: 'topRight',
        })
        return null
      }
    },
    [dispatch, notification],
  )

  const cancelUpload = useCallback(
    (uploadId: string) => {
      dispatch(removeUploadFromQueue(uploadId))
    },
    [dispatch],
  )

  return { startUpload, cancelUpload, validateFile }
}
