import { DesktopOutlined } from "@ant-design/icons";
import { Select, Typography } from "antd";
import { useMemo } from "react";
import { getSupportedArchitectures } from "../services/api";
import { useExtensionStore } from "../store/useExtensionStore";
import { Architecture } from "../types";

const { Option } = Select;
const { Text } = Typography;


const architecturesMap = getSupportedArchitectures();

const ArchSelector = () => {
  const { selectedArchitecture, setSelectedArchitecture, availableArchitectures } = useExtensionStore();
  const architectures = useMemo(() => {
    return availableArchitectures.map((arch) => architecturesMap.get(arch)!).filter(Boolean);
  }, [availableArchitectures]);

  return (
    <div className="w-70">
      <div className="mb-2">
        <Text strong>
          <DesktopOutlined style={{ marginRight: '6px' }} />
          Target Architecture
        </Text>
      </div>
      <Select
        value={selectedArchitecture}
        onChange={(value) => setSelectedArchitecture(value as Architecture)}
        placeholder="Select Architecture"
        style={{ width: '200px' }}
      >
        {architectures.map((arch) => (
          <Option key={arch.value} value={arch.value}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>
                <span style={{ marginRight: '8px', fontSize: '1.1em' }}>
                  {arch.icon}
                </span>
                {arch.label}
              </span>
            </div>
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default ArchSelector;