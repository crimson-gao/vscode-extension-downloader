import { AppstoreOutlined, TagsOutlined } from "@ant-design/icons";
import { Space, Tag, Typography } from "antd";
import { useExtensionStore } from "../store/useExtensionStore";
const { Text } = Typography;

const Category = () => {
  const { extension } = useExtensionStore();
  if (!extension) return <></>;
  return (
    <div>
      {extension.categories && extension.categories.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '8px' }}>
            <Text strong>
              <AppstoreOutlined style={{ marginRight: '6px' }} />
              Categories
            </Text>
          </div>
          <Space size={[8, 8]} wrap>
            {extension.categories.slice(0, 5).map((category) => (
              <Tag key={category} color="blue">
                {category}
              </Tag>
            ))}
          </Space>
        </div>
      )}

      {extension.tags && extension.tags.length > 0 && (
        <div>
          <div style={{ marginBottom: '8px' }}>
            <Text strong>
              <TagsOutlined style={{ marginRight: '6px' }} />
              Tags
            </Text>
          </div>
          <Space size={[8, 8]} wrap>
            {extension.tags.slice(0, 8).map((tag) => (
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