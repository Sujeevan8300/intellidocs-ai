import { useAppDispatch, useAppSelector } from '../../../hooks/store'
import { removeConversation, renameConversation, selectConversation } from '../slices/chatSlice'
export function useConversation() { const dispatch = useAppDispatch(); const state = useAppSelector((root) => root.chat); return { ...state, select: (id: string) => dispatch(selectConversation(id)), rename: (id: string, title: string) => dispatch(renameConversation({ id, title })), remove: (id: string) => dispatch(removeConversation(id)) } }
