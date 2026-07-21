import { Tag, Progress } from 'antd'
import { getProcessingColor, getProcessingLabel } from '../../utils/documentUtils'
import type { ProcessingStatus } from '../../types/ProcessingStatus'

interface ProcessingStatusProps {
  status: ProcessingStatus
  progress: number
}

export function ProcessingStatusBadge({ status, progress }: ProcessingStatusProps) {
  const isActive = status !== 'READY' && status !== 'FAILED'

  return (
    <div className="doc-processing">
      <Tag color={getProcessingColor(status)} className="doc-processing-tag">
        {getProcessingLabel(status)}
      </Tag>
      {isActive && (
        <Progress
          percent={Math.round(progress)}
          size="small"
          strokeColor="#6558e8"
          className="doc-processing-progress"
        />
      )}
    </div>
  )
}
