import { AppstoreOutlined, TagsOutlined } from "@ant-design/icons";
import { Space, Tag, Typography } from "antd";
import React, { useMemo } from "react";
import { useExtensionStore } from "../store/useExtensionStore";

const { Text } = Typography;

const Category: React.FC = () => {
  const { extension } = useExtensionStore();

  const displayCategories = useMemo(() => {
    return extension?.categories?.slice(0, 5) ?? [];
  }, [extension?.categories]);

  const displayTags = useMemo(() => {
    return extension?.tags?.slice(0, 8) ?? [];
  }, [extension?.tags]);

  if (!extension) return null;

  return (
    <div>
      {displayCategories.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '8px' }}>
            <Text strong>
              <AppstoreOutlined style={{ marginRight: '6px' }} />
              Categories
            </Text>
          </div>
          <Space size={[8, 8]} wrap>
            {displayCategories.map((category) => (
              <Tag key={category} color="blue">
                {category}
              </Tag>
            ))}
          </Space>
        </div>
      )}

      {displayTags.length > 0 && (
        <div>
          <div style={{ marginBottom: '8px' }}>
            <Text strong>
              <TagsOutlined style={{ marginRight: '6px' }} />
              Tags
            </Text>
          </div>
          <Space size={[8, 8]} wrap>
            {displayTags.map((tag) => (
              <Tag key={tag} color="default">
                {tag}
              </Tag>
            ))}
          </Space>
        </div>
      )}
    </div>
  );
};

export default Category;