import { Tabs } from "antd";
import { ReactElement } from "react";

type TTab = {
  label: ReactElement | string;
  key: string;
  children: ReactElement | string;
};

type TTabNavigationProps = {
  tabList: TTab[];
};

const TabNavigation = ({ tabList }: TTabNavigationProps) => {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        size="large"
        style={{ marginBottom: 32 }}
        items={tabList}
      />
    </>
  );
};

export default TabNavigation;
export type { TTab };
