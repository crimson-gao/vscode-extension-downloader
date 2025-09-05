
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { downloadFile, getDownloadUrl } from '../services/api';
import { useExtensionStore } from '../store/useExtensionStore';

export const DownloadBtn: React.FC = () => {
  const { extension, selectedVersion, availableVersions, selectedArchitecture } = useExtensionStore();

  const versions = availableVersions.get(selectedArchitecture) ?? [];
  const selectedVersionObj = versions.find(v => v.version === selectedVersion);

  const extensionId = useMemo(() => {
    return `${extension?.publisher.publisherName}.${extension?.extensionName}`;
  }, [extension]);

  const handleDownload = useCallback(async () => {
    if (!selectedVersionObj || !extension) {
      return;
    }

    const downloadUrl = getDownloadUrl(selectedVersionObj);
    if (!downloadUrl) {
      console.error('No download URL found');
      return;
    }

    const fileName = `${extensionId}-${selectedVersion}-${selectedArchitecture}.vsix`;

    try {
      await downloadFile(downloadUrl, fileName);
    } catch (error) {
      console.error('Download failed:', error);
    }
  }, [extension, selectedVersion, selectedArchitecture, selectedVersionObj, extensionId]);

  const handleCopyLink = useCallback(async () => {
    if (!selectedVersionObj || !extension) {
      return;
    }

    const downloadUrl = getDownloadUrl(selectedVersionObj);
    if (!downloadUrl) {
      message.error('No download URL found');
      return;
    }

    try {
      await navigator.clipboard.writeText(downloadUrl);
      message.success('Download link copied to clipboard!');
    } catch (error) {
      console.error('Copy failed:', error);
      message.error('Failed to copy link');
    }
  }, [selectedVersionObj, extension]);

  const handleGoToMarketplace = useCallback(async () => {
    if (!selectedVersionObj || !extension) {
      return;
    }

    window.open(`https://marketplace.visualstudio.com/items?itemName=${extensionId}`, '_blank');
  }, [selectedVersionObj, extension, extensionId]);

  if (!selectedVersion) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2">
      <div className="flex gap-2 mb-24 items-center">
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
          disabled={!selectedVersionObj}
        >
          Download v{selectedVersion}
        </Button>
        <Button
          icon={<LinkOutlined />}
          onClick={handleCopyLink}
          disabled={!selectedVersionObj}
          variant="filled"
          style={{
            border: 'none',
            boxShadow: 'none',
            transition: 'all 0.2s ease',
          }}
        >
          Copy Link
        </Button>
        <Button
          icon={<LinkOutlined />}
          onClick={handleGoToMarketplace}
          variant="filled"
          style={{
            border: 'none',
            boxShadow: 'none',
            transition: 'all 0.2s ease',
          }}
        >
          Go to Marketplace
        </Button>
      </div>
    </div>
  );
};