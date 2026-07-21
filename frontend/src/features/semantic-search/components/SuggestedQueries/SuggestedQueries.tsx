import { searchSuggestions } from '../../mocks/suggestions'
export function SuggestedQueries({ onSelect }: { onSelect: (query: string) => void }) { return <section className="search-suggestions"><p>TRY ASKING</p><div>{searchSuggestions.map((query) => <button key={query} onClick={() => onSelect(query)}>{query}</button>)}</div></section> }
