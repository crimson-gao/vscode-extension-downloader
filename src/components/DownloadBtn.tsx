
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback } from 'react';
import { downloadFile, getDownloadUrl } from '../services/api';
import { useExtensionStore } from '../store/useExtensionStore';

export const DownloadBtn: React.FC = () => {
  const { extension, selectedVersion, availableVersions, selectedArchitecture } = useExtensionStore();

  const versions = availableVersions.get(selectedArchitecture) ?? [];
  const selectedVersionObj = versions.find(v => v.version === selectedVersion);

  const handleDownload = useCallback(async () => {
    if (!selectedVersionObj || !extension) {
      return;
    }
    
    const downloadUrl = getDownloadUrl(selectedVersionObj);
    if (!downloadUrl) {
      console.error('No download URL found');
      return;
    }
    
    const fileName = `${extension.displayName}-${selectedVersion}-${selectedArchitecture}.vsix`;
    
    try {
      await downloadFile(downloadUrl, fileName);
    } catch (error) {
      console.error('Download failed:', error);
    }
  }, [extension, selectedVersion, selectedArchitecture, selectedVersionObj]);

  if (!selectedVersion) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2">
      <div className="flex gap-2 mb-24 items-center">
        <Button
          type="primary"
          size="large"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
          disabled={!selectedVersionObj}
        >
          Download v{selectedVersion}
        </Button>
      </div>
    </div>
  );
};