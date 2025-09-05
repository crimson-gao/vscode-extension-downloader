import { AppstoreOutlined, CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip, Typography } from "antd";
import React, { useMemo } from "react";
import { useExtensionStore } from "../store/useExtensionStore";
import { ExtensionFile, ExtensionVersion } from "../types";

const { Title, Text, Paragraph } = Typography;

function getExtensionIconUrl(version: ExtensionVersion): string | null {
  const iconFile = version.files.find((file: ExtensionFile) =>
    file.assetType === 'Microsoft.VisualStudio.Services.Icons.Default'
  );

  return iconFile?.source || null;
}

const Description: React.FC = () => {
  const { extension } = useExtensionStore();
  
  const iconUrl = useMemo(() => {
    return extension && extension.versions.length > 0 
      ? getExtensionIconUrl(extension.versions[0]) 
      : null;
  }, [extension]);

  const isVerifiedPublisher = useMemo(() => {
    return extension?.publisher?.flags?.includes('verified') ?? false;
  }, [extension?.publisher?.flags]);

  if (!extension) return null;
  return (
    <div className="w-160 flex flex-row">
      <Avatar
        size={80}
        src={iconUrl || undefined}
        icon={!iconUrl && <AppstoreOutlined />}
        style={{ marginRight: '16px', flexShrink: 0 }}
      />

      {/* 描述 */}
      <div className="flex flex-col flex-1 w-75">
        <div className="flex items-center mb-2">
          <Title level={3} style={{ margin: 0, marginRight: '8px' }}>
            {extension.displayName}
          </Title>
          {isVerifiedPublisher && (
            <Tooltip title="Verified Publisher">
              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '20px' }} />
            </Tooltip>
          )}
        </div>

        <div className="flex items-center mb-3">
          <UserOutlined style={{ marginRight: '6px', color: '#8c8c8c' }} />
          <Text type="secondary">{extension.publisher.displayName}</Text>
        </div>

        <Paragraph style={{ marginBottom: '16px', color: '#595959' }}>
          {extension.shortDescription}
        </Paragraph>
      </div>
    </div>
  );
};

export default Description;