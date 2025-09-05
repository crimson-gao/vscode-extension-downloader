import { ApiOutlined, SearchOutlined } from '@ant-design/icons';
import { Alert, Card, Space, Tag, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useCallback, useMemo, useState } from 'react';
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
    searchExtensionById(localInput);
  }, [searchExtensionById, localInput]);

  const exampleTags = useMemo(() => {
    return exampleExtensions.map((ext) => (
      <Tag
        key={ext.id}
        icon={<ApiOutlined />}
        className="cursor-pointer hover:text-blue-400 hover:border-gray-400"
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
          <Space size={[2, 8]} wrap>
            {exampleTags}
          </Space>
        </div>

      </div>

    </Card>
  );
};

export default SearchBar;
