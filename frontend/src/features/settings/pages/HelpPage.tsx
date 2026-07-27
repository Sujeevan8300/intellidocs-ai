import { Card, Collapse } from 'antd'
import {
  BookOutlined,
  QuestionCircleOutlined,
  MessageOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import styles from '../styles/settings.module.css'

const FAQ_ITEMS = [
  {
    key: '1',
    label: <span className={styles.faqQuestion}>How do I upload documents?</span>,
    children: <p className={styles.faqAnswer}>Navigate to Documents in the sidebar and click the Upload button. You can drag and drop files or browse to select them. Supported formats include PDF, DOCX, TXT, and MD.</p>,
  },
  {
    key: '2',
    label: <span className={styles.faqQuestion}>How does the AI Assistant work?</span>,
    children: <p className={styles.faqAnswer}>The AI Assistant uses your uploaded documents as context. Ask questions in natural language and it will find relevant information from your knowledge base and generate answers with source citations.</p>,
  },
  {
    key: '3',
    label: <span className={styles.faqQuestion}>Can I share documents with my team?</span>,
    children: <p className={styles.faqAnswer}>Yes. Use the Categories feature to organize documents and control access. Team members with the appropriate role can view and search within shared categories.</p>,
  },
  {
    key: '4',
    label: <span className={styles.faqQuestion}>How do I manage user access?</span>,
    children: <p className={styles.faqAnswer}>Navigate to Users in the sidebar. Admins can invite new users, assign roles (Viewer, Contributor, Knowledge Manager, Super Admin), and manage permissions from the user management page.</p>,
  },
  {
    key: '5',
    label: <span className={styles.faqQuestion}>What analytics are available?</span>,
    children: <p className={styles.faqAnswer}>The Analytics dashboard shows document views, search queries, AI interactions, user activity, and category performance. You can filter by date range and export reports.</p>,
  },
  {
    key: '6',
    label: <span className={styles.faqQuestion}>Is my data secure?</span>,
    children: <p className={styles.faqAnswer}>IntelliDocs AI uses enterprise-grade encryption for data at rest and in transit. All access is logged for audit purposes. Administrators can review audit logs from the user management section.</p>,
  },
]

const QUICK_LINKS = [
  { icon: <BookOutlined />, title: 'Documentation', desc: 'Browse the full IntelliDocs documentation and guides.' },
  { icon: <QuestionCircleOutlined />, title: 'FAQ', desc: 'Find answers to commonly asked questions.' },
  { icon: <MessageOutlined />, title: 'Contact Support', desc: 'Reach our support team at support@intellidocs.ai.' },
  { icon: <FileTextOutlined />, title: 'Release Notes', desc: 'See what\'s new in the latest IntelliDocs updates.' },
]

export function HelpPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <h1 className={styles.pageTitle}>Help & Support</h1>
          <p className={styles.pageSubtitle}>Find answers, get help, and learn how to use IntelliDocs</p>
        </div>
      </div>

      <div className={styles.helpGrid}>
        {QUICK_LINKS.map((link) => (
          <Card key={link.title} className={styles.helpCard}>
            <div className={styles.helpIcon}>{link.icon}</div>
            <div>
              <p className={styles.helpCardTitle}>{link.title}</p>
              <p className={styles.helpCardDesc}>{link.desc}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className={styles.sectionCard} title="Frequently Asked Questions">
        <Collapse ghost items={FAQ_ITEMS} />
      </Card>
    </div>
  )
}
