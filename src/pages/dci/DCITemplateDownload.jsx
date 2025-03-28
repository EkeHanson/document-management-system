import React from 'react';
import { Button, Alert } from 'antd';
import { DownloadOutlined, FileExcelOutlined } from '@ant-design/icons';

const DCITemplateDownload = () => {
  const handleDownload = () => {
    // In a real implementation, this would download the template file
    console.log('Downloading DCI template...');
    // Simulate download
    const link = document.createElement('a');
    link.href = '/templates/dci-import-template.xlsx';
    link.download = 'dci-import-template.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mb-4">
      <Alert
        message={
          <div className="flex items-center justify-between">
            <span>
              <FileExcelOutlined className="mr-2" />
              Download DCI Import Template
            </span>
            <Button 
              type="primary" 
              icon={<DownloadOutlined />}
              onClick={handleDownload}
            >
              Download Template
            </Button>
          </div>
        }
        description="Use this Excel template to ensure your data imports correctly. The template includes all required fields and formatting."
        type="info"
        showIcon={false}
      />
    </div>
  );
};

export default DCITemplateDownload;