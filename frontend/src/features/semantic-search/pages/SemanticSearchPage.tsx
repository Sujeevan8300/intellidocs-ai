import { BookOutlined, FilterOutlined, MenuOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Drawer, message } from 'antd'
import { useState } from 'react'
import { DocumentPreview } from '../components/DocumentPreview/DocumentPreview'
import { EmptySearchState } from '../components/EmptySearchState/EmptySearchState'
import { RelatedQuestions } from '../components/RelatedQuestions/RelatedQuestions'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { SearchFilters } from '../components/SearchFilters/SearchFilters'
import { SearchHistory } from '../components/SearchHistory/SearchHistory'
import { SearchResultList } from '../components/SearchResultList/SearchResultList'
import { SuggestedQueries } from '../components/SuggestedQueries/SuggestedQueries'
import { useSearchFilters } from '../hooks/useSearchFilters'
import { useSearchHistory } from '../hooks/useSearchHistory'
import { useSemanticSearch } from '../hooks/useSemanticSearch'
import { useAppDispatch } from '../../../hooks/store'
import { selectDocument, toggleSaved } from '../slices/searchSlice'
import type { SearchResult } from '../types/SearchResult'
import './semantic-search.css'
export function SemanticSearchPage() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { query, results, loading, error, understanding, relatedQuestions, selectedDocument, saved, search, setQuery } = useSemanticSearch()
  const { filters, update } = useSearchFilters()
  const { history, clear } = useSearchHistory()
  const selectQuery = (value: string) => { setQuery(value); void search(value) }
  const preview = (result: SearchResult) => dispatch(selectDocument(result))
  const saveSearch = () => { if (query) { dispatch(toggleSaved(query)); message.success(saved.includes(query) ? 'Search removed from saved items' : 'Search saved') } }
  return <div className="semantic-page">
    <header className="semantic-intro"><div><p className="semantic-eyebrow">AI-POWERED DISCOVERY</p><h1>Semantic Search</h1><span>Find information from company documents using natural language.</span></div><Button className="filter-mobile" icon={<MenuOutlined />} onClick={() => setFiltersOpen(true)}>Filters</Button></header>
    <SearchBar value={query} loading={loading} onChange={setQuery} onSearch={() => void search()} />
    <SuggestedQueries onSelect={selectQuery} />
    <div className="semantic-layout">
      <aside className="semantic-filter-desktop"><SearchFilters value={filters} onChange={update} /><SearchHistory entries={history} onSelect={selectQuery} onClear={clear} /><section className="saved-searches"><h3><SaveOutlined /> Saved searches</h3>{saved.map((item) => <button key={item} onClick={() => { dispatch(toggleSaved(item)); message.success(`Removed “${item}” from saved searches`) }}><BookOutlined /> {item}</button>)}</section></aside>
      <Drawer title={<><FilterOutlined /> Filters</>} open={filtersOpen} onClose={() => setFiltersOpen(false)} placement="left" width={310}><SearchFilters value={filters} onChange={update} /></Drawer>
      <main className="semantic-results">
        {!query && !loading ? <><EmptySearchState /><SearchHistory entries={history} onSelect={selectQuery} onClear={clear} /></> : <>
          {understanding && !loading && <div className="search-understanding"><span>✦</span><div><strong>AI search understanding</strong><p>{understanding}</p></div></div>}
          {error && <div className="search-error">{error}</div>}
          <div className="results-heading"><div><h2>{loading ? 'Searching your knowledge base' : `${results.length} relevant ${results.length === 1 ? 'result' : 'results'}`}</h2>{!loading && <span>Ranked by AI relevance and document context</span>}</div>{results.length > 0 && <Button icon={<SaveOutlined />} onClick={saveSearch}>{saved.includes(query) ? 'Saved' : 'Save search'}</Button>}</div>
          <SearchResultList results={results} loading={loading} onPreview={preview} />
          {relatedQuestions.length > 0 && !loading && <RelatedQuestions questions={relatedQuestions} onSelect={selectQuery} />}
        </>}
      </main>
    </div>
    <DocumentPreview result={selectedDocument} onClose={() => dispatch(selectDocument(null))} />
  </div>
}
