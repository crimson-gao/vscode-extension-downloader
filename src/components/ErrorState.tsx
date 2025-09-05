import { ExclamationCircleOutlined, HomeOutlined, ReloadOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Space, Typography } from 'antd';
import React from 'react';
import { useExtensionStore } from '../store/useExtensionStore';

const { Title, Text } = Typography;

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  const { clearError, reset } = useExtensionStore();

  const handleRetry = () => {
    clearError();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Card style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <ExclamationCircleOutlined 
          style={{ 
            fontSize: '64px', 
            color: '#ff4d4f',
            marginBottom: '16px'
          }} 
        />
        <Title level={4} style={{ color: '#ff4d4f', marginBottom: '16px' }}>
          Oops! Something went wrong
        </Title>
      </div>

      <Alert
        message="Error Details"
        description={error}
        type="error"
        showIcon
        style={{ 
          marginBottom: '24px',
          textAlign: 'left',
          maxWidth: '500px',
          margin: '0 auto 24px auto'
        }}
      />

      <Text type="secondary" style={{ display: 'block', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px auto' }}>
        This could be due to network issues, invalid extension ID, or the extension might not exist in the marketplace.
      </Text>

      <Space size="middle">
        <Button 
          type="primary" 
          icon={<ReloadOutlined />} 
          onClick={handleRetry}
        >
          Try Again
        </Button>
        <Button 
          icon={<HomeOutlined />} 
          onClick={handleReset}
        >
          Start Over
        </Button>
      </Space>

      <div style={{ marginTop: '24px' }}>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          💡 Tips: Make sure the extension ID follows the format "publisher.extension" 
          or use a valid marketplace URL
        </Text>
      </div>
    </Card>
  );
};

export default ErrorState;
