import type { SearchFilters } from '../types/Filter'
import type { SearchResponse } from '../types/SearchQuery'
export interface SearchService { search(query: string, filters: SearchFilters): Promise<SearchResponse> }
