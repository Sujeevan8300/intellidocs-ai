import { FileTextOutlined, RightOutlined } from '@ant-design/icons'
import { App } from 'antd'
import type { Citation } from '../../types/Citation'
export function SourceCitation({ citation }: { citation: Citation }) { const { message } = App.useApp(); return <button className="source-citation" onClick={() => message.info(`Preview for ${citation.documentName} will be available soon.`)}><span className="citation-file"><FileTextOutlined /></span><span><strong>{citation.documentName}</strong><small>Page {citation.page} · {citation.excerpt}</small></span><RightOutlined /></button> }
