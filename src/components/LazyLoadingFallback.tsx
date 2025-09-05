import { Spin } from 'antd';
import React from 'react';

interface LazyLoadingFallbackProps {
  height?: number;
  tip?: string;
}

const LazyLoadingFallback: React.FC<LazyLoadingFallbackProps> = ({ 
  height = 200, 
  tip = 'Loading...' 
}) => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: `${height}px`,
        width: '100%'
      }}
    >
      <Spin size="large" tip={tip} />
    </div>
  );
};

export default LazyLoadingFallback;
