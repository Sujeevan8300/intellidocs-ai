import React from 'react';
import { Dropdown, Button, notification, MenuProps } from 'antd';
import { DownloadOutlined, FilePdfOutlined, FileExcelOutlined, FileTextOutlined } from '@ant-design/icons';

interface ExportButtonProps {
  onExport: (format: 'pdf' | 'excel' | 'csv') => Promise<unknown>;
  exporting?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ onExport, exporting = false }) => {
  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    notification.info({
      message: 'Export Started',
      description: `Preparing ${format.toUpperCase()} analytics report download...`,
      duration: 2,
    });

    try {
      await onExport(format);
      notification.success({
        message: 'Export Completed',
        description: `Your ${format.toUpperCase()} report has been generated successfully.`,
      });
    } catch {
      notification.error({
        message: 'Export Failed',
        description: 'Unable to generate analytics export report.',
      });
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'pdf',
      label: 'Export as PDF',
      icon: <FilePdfOutlined style={{ color: '#ff4d4f' }} />,
      onClick: () => handleExport('pdf'),
    },
    {
      key: 'excel',
      label: 'Export as Excel (.xlsx)',
      icon: <FileExcelOutlined style={{ color: '#52c41a' }} />,
      onClick: () => handleExport('excel'),
    },
    {
      key: 'csv',
      label: 'Export as CSV',
      icon: <FileTextOutlined style={{ color: '#1677ff' }} />,
      onClick: () => handleExport('csv'),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button type="primary" icon={<DownloadOutlined />} loading={exporting}>
        Export Report
      </Button>
    </Dropdown>
  );
};
