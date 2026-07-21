import { useAppDispatch, useAppSelector } from '../../../hooks/store'
import { clearHistory } from '../slices/searchSlice'
export function useSearchHistory() { const dispatch = useAppDispatch(); return { history: useAppSelector((state) => state.semanticSearch.history), clear: () => dispatch(clearHistory()) } }
