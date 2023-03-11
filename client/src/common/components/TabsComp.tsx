import { Tabs } from "antd";
import { ITabProps } from "common/types";

interface ITabsCompProps {
  tabList: ITabProps[];
}

const TabsComp = ({ tabList }: ITabsCompProps) => {
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

export default TabsComp;
