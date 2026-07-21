import { FilePdfOutlined, RightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { SimilarityScore } from '../SimilarityScore/SimilarityScore'
import type { SearchResult } from '../../types/SearchResult'
export function SearchResultCard({ result, onPreview }: { result: SearchResult; onPreview: (result: SearchResult) => void }) { return <article className="search-result-card"><div className="result-card-top"><span className="result-file"><FilePdfOutlined /></span><div><h3>{result.title}</h3><span>{result.category} · Updated {result.updatedDate}</span></div><SimilarityScore score={result.similarityScore} /></div><p>{result.content}</p><div className="result-source"><FilePdfOutlined /><span><strong>{result.documentName}</strong><small>Page {result.pageNumber}</small></span><Button type="link" onClick={() => onPreview(result)}>View document <RightOutlined /></Button></div></article> }
