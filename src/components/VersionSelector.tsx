import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Alert, Select, Typography } from "antd";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";
import { useExtensionStore } from "../store/useExtensionStore";

const { Text } = Typography;
const { Option } = Select;

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'yyyy/MM/dd');
  } catch {
    return dateString;
  }
};

const VersionSelector = () => {
  const { availableVersions, selectedVersion, selectedArchitecture, setSelectedVersion } = useExtensionStore();

  const filteredVersions = useMemo(() => {
    return availableVersions.get(selectedArchitecture) ?? [];
  }, [availableVersions, selectedArchitecture]);

  const handleVersionChange = useCallback((value: string) => {
    setSelectedVersion(value);
  }, [setSelectedVersion]);

  return (
    <div className="w-70">
      <div className="mb-2">
        <Text strong>
          <ClockCircleOutlined style={{ marginRight: '6px' }} />
          Version Selection
        </Text>
      </div>

      {filteredVersions.length > 0 ? (
        <Select
          value={selectedVersion}
          onChange={handleVersionChange}
          placeholder="Select Version"
          style={{ minWidth: '200px', maxWidth: '300px' }}
        >
          {filteredVersions.map((version, index) => {
            const versionClass = index === 0 ? 'font-bold mr-1 text-blue-500' : 'font-bold mr-1';
            return (
              <Option key={version.version} value={version.version}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={versionClass}>v{version.version}</span>
                  <span className="flex flex-row gap-1 items-center">
                    <CalendarOutlined style={{ color: '#1890ff' }} />
                    <span className="text-xs text-gray-500">
                      {formatDate(version.lastUpdated)}
                    </span>
                  </span>
                </div>
              </Option>
            )
          })}
        </Select>
      ) : (
        <Alert
          message={`No versions available for ${selectedArchitecture}`}
          description="Try selecting 'Universal' architecture"
          type="warning"
          showIcon
        />
      )}
    </div>
  );
};

export default VersionSelector;