export interface Activity { id: string; title: string; meta: string; type: 'upload' | 'chat' | 'edit' | 'user' }
export interface DocumentRow { id: string; name: string; type: string; size: string; updated: string; status: 'Processed' | 'Processing' | 'Needs review'; owner: string }
