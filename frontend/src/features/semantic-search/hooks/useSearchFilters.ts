import { useAppDispatch, useAppSelector } from '../../../hooks/store'
import type { SearchFilters } from '../types/Filter'
import { setFilters } from '../slices/searchSlice'
export function useSearchFilters() { const dispatch = useAppDispatch(); const filters = useAppSelector((state) => state.semanticSearch.filters); return { filters, update: (value: SearchFilters) => dispatch(setFilters(value)) } }
