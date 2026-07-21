import { FilePdfOutlined } from '@ant-design/icons'
import { Drawer, Tag } from 'antd'
import type { SearchResult } from '../../types/SearchResult'
export function DocumentPreview({ result, onClose }: { result: SearchResult | null; onClose: () => void }) { return <Drawer title="Document preview" open={Boolean(result)} onClose={onClose} width={440}><div className="preview-doc"><span className="preview-file"><FilePdfOutlined /></span><h2>{result?.documentName}</h2><div><Tag>{result?.category}</Tag><Tag>Page {result?.pageNumber}</Tag></div><span className="preview-label">RELEVANT SECTION</span><blockquote>{result?.content}</blockquote><dl><div><dt>Last updated</dt><dd>{result?.updatedDate}</dd></div><div><dt>Source document</dt><dd>{result?.title}</dd></div></dl></div></Drawer> }
