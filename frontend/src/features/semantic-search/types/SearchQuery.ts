import type { SearchResult } from './SearchResult'
export interface SearchResponse { results: SearchResult[]; understanding: string; relatedQuestions: string[] }
