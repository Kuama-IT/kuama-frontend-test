import React from "react";
import "../PageStructure/PageStructure.css";
import { Layout, Menu, theme } from "antd";
import { SideBarLinks } from "../Utilities/Utility";
import { Select } from "antd";
import Data from "../data/details.json";

const { Header, Content, Footer, Sider } = Layout;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

export const PageSturcture = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken: any) => {
          console.log(broken);
        }}
        onCollapse={(collapsed: any, type: any) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={SideBarLinks.map((item, index) => ({
            key: String(index + 1),
            icon: (
              <img
                className="company_logo"
                src={item.image}
                alt="company_logo"
              />
            ),
            label: <div className="sidemenu_label">{item.label}</div>,
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "14px 0 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 860,
              background: colorBgContainer,
            }}
          >
            <div className="dropdown">
              <Select
                defaultValue="Select..."
                style={{ width: 120 }}
                onChange={handleChange}
                options={Array.from(
                  new Set(
                    Data &&
                      Data.details.map((item) => item.beneficiary_entity_type)
                  )
                ).map((entity_type) => {
                  return {
                    value: entity_type,
                    label: entity_type.toUpperCase(),
                  };
                })}
              />
            </div>
          </div>
        </Content>
        <Footer className="footer_text" style={{ textAlign: "center" }}>
          KUAMA
        </Footer>
      </Layout>
    </Layout>
  );
};
