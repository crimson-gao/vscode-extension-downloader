import { ApiOutlined, SearchOutlined } from '@ant-design/icons';
import { Alert, Card, Space, Tag, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useCallback, useMemo, useState } from 'react';
import { parseExtensionInput } from '../services/api';
import { useExtensionStore } from '../store/useExtensionStore';

const { Title } = Typography;

const exampleExtensions = [
  { id: 'ms-vscode.cpptools', label: 'C/C++' },
  { id: 'ms-python.python', label: 'Python' },
  { id: 'ms-vscode.vscode-typescript-next', label: 'TypeScript' },
];

const SearchBar: React.FC = () => {
  const [localInput, setLocalInput] = useState('');
  const { loading, searchExtensionById, error, clearError } = useExtensionStore();

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInput(event.target.value);
    if (error) {
      clearError();
    }
  }, [clearError, error]);

  const handleExampleClick = useCallback((extensionId: string) => {
    setLocalInput(extensionId);
    searchExtensionById(extensionId);
  }, [searchExtensionById, setLocalInput]);

  const handleSearch = useCallback(() => {
    const parsedInput = parseExtensionInput(localInput);
    if (!parsedInput && localInput.trim() !== '') {
      const url = new URL('https://marketplace.visualstudio.com/search');
      url.searchParams.set('term', localInput);
      url.searchParams.set('target', 'VSCode');
      url.searchParams.set('category', 'All%20categories');
      url.searchParams.set('sortBy', 'Relevance');
      window.open(url.toString(), '_blank');
      return;
    }
    if (parsedInput) {
      searchExtensionById(`${parsedInput.publisherName}.${parsedInput.extensionName}`);
    }
  }, [searchExtensionById, localInput]);

  const exampleTags = useMemo(() => {
    return exampleExtensions.map((ext) => (
      <Tag
        key={ext.id}
        icon={<ApiOutlined />}
        style={{
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#1890ff';
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.borderColor = '#1890ff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '';
          e.currentTarget.style.color = '';
          e.currentTarget.style.borderColor = '';
        }}
        onClick={() => handleExampleClick(ext.id)}
      >
        {ext.label}
      </Tag>
    ));
  }, [handleExampleClick]);

  return (
    <Card style={{ marginBottom: '24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Title level={2} style={{ marginBottom: '8px', color: '#1890ff' }}>
          VSCode Extension Downloader
        </Title>
        <Typography.Text type="secondary" style={{ fontSize: '14px', lineHeight: '1.4' }}>
          Download VSCode extensions for offline installation
        </Typography.Text>
      </div>

      <div className="px-40">
        <div className="flex justify-center py-2">
          <Search
            placeholder="Enter extension ID or marketplace URL..."
            allowClear
            enterButton="Search"
            size="large"
            value={localInput}
            onChange={handleInputChange}
            onPressEnter={handleSearch}
            disabled={loading}
            prefix={<SearchOutlined />}
            style={{ flex: 1 }}
            onSearch={handleSearch}
          />
        </div>

        {error && (
          <Alert
            message="Search Error"
            description={error}
            type="error"
            showIcon
            closable
            onClose={clearError}
            style={{ marginBottom: '16px' }}
          />
        )}

        <div>
          <span className="text-gray-500 pr-1">Popular:</span>
          <Space size={[2, 8]} wrap>
            {exampleTags}
          </Space>
        </div>

      </div>

    </Card>
  );
};

export default SearchBar;
