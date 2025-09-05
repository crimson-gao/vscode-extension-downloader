
import {
  DownloadOutlined
} from '@ant-design/icons';
import {
  Button
} from 'antd';
import { useCallback } from 'react';
import { downloadFile, getDownloadUrl } from '../services/api';
import { useExtensionStore } from '../store/useExtensionStore';

export const DownloadBtn = () => {
  const { extension, selectedVersion, availableVersions, selectedArchitecture } = useExtensionStore();

  const versions = availableVersions.get(selectedArchitecture) ?? [];
  const selectedVersionObj = versions.find(v => v.version === selectedVersion);


  const handleDownload = useCallback(async () => {
    if (!selectedVersionObj)
      return;
    const downloadUrl = getDownloadUrl(selectedVersionObj);
    if (!downloadUrl) return;
    const fileName = `${extension?.displayName}-${selectedVersion}-${selectedArchitecture}.vsix`
    try {
      await downloadFile(downloadUrl, fileName)
    } catch (error) {
      console.error('download failed:', error);
    }
  }, [extension, selectedVersion, selectedArchitecture, selectedVersionObj])

  return (
    <div className="flex flex-row gap-2">
      {selectedVersion && (
        <div className="flex gap-2 mb-24 items-center">
          <>
            <Button
              type="primary"
              size="large"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
            >
              Download v{selectedVersion}
            </Button>
          </>
        </div>
      )}
    </div>
  );
};