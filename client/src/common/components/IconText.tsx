import React from "react";
import { Space, Tooltip } from "antd";

interface IconTextProps {
  icon: React.FC;
  text: string | number;
  tooltip?: string;
}

const IconText = ({ icon, text, tooltip }: IconTextProps) => {
  return (
    <Tooltip title={tooltip}>
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    </Tooltip>
  );
};

export default IconText;
