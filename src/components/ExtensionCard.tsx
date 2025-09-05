import { Card, Divider } from 'antd';
import React, { Suspense } from 'react';
import ArchSelector from './ArchSelector';
import { DownloadBtn } from './DownloadBtn';
import LazyLoadingFallback from './LazyLoadingFallback';

// Lazy load 较大的子组件
const Category = React.lazy(() => import('./Category'));
const Description = React.lazy(() => import('./Description'));
const VersionSelector = React.lazy(() => import('./VersionSelector'));

const ExtensionCard: React.FC = () => {
  return (
    <Card style={{ marginBottom: '24px' }}>
      {/* 扩展基本信息 */}
      <div className="flex flex-row items-start mb-2 space-between gap-6">
        <div className="w-2/3 flex flex-col gap-8">
          <Suspense fallback={<LazyLoadingFallback height={80} tip="Loading description..." />}>
            <Description />
          </Suspense>
          <div className="flex flex-row space-between">
            <ArchSelector />
            <Suspense fallback={<LazyLoadingFallback height={50} tip="Loading versions..." />}>
              <VersionSelector />
            </Suspense>
          </div>
          <DownloadBtn />
        </div>

        <Divider type="vertical" style={{ height: '150px' }} />
        <Suspense fallback={<LazyLoadingFallback height={120} tip="Loading categories..." />}>
          <Category />
        </Suspense>
      </div>
    </Card>
  );
};

export default ExtensionCard;
