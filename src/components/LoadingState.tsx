import { SearchOutlined } from '@ant-design/icons';
import { Card, Spin, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

const LoadingState: React.FC = () => {
  return (
    <Card style={{ textAlign: 'center', padding: '48px 24px' }}>
      <Spin size="large" />
      <div style={{ marginTop: '24px' }}>
        <Title level={4} style={{ color: '#1890ff', marginBottom: '8px' }}>
          <SearchOutlined style={{ marginRight: '8px' }} />
          Searching Extension...
        </Title>
        <Text type="secondary">
          Fetching extension information and version history from VSCode Marketplace
        </Text>
      </div>
    </Card>
  );
};

export default LoadingState;
