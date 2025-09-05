import { Card, Divider } from 'antd';
import React from 'react';
import ArchSelector from './ArchSelector';
import Category from './Category';
import Description from './Description';
import { DownloadBtn } from './DownloadBtn';
import { VersionSelector } from './VersionSelector';

const ExtensionCard: React.FC = () => {
  return (
    <Card style={{ marginBottom: '24px' }}>
      {/* 扩展基本信息 */}
      <div className="flex flex-row items-start mb-2 space-between gap-6">
        <div className="w-2/3 flex flex-col gap-8">
          <Description />
          <div className="flex flex-row space-between">
            <ArchSelector />
            <VersionSelector />
          </div>
          <DownloadBtn />
        </div>

        <Divider type="vertical" style={{ height: '150px' }} />
        <Category />
      </div>
    </Card>
  );
};

export default ExtensionCard;
