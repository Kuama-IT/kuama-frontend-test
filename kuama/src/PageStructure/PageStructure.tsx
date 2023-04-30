import React, { useState } from "react";
import "../PageStructure/PageStructure.css";
import { Layout, Menu, theme, Button, Checkbox, Form, Input } from "antd";
import { SideBarLinks } from "../Utilities/Utility";
import { Select } from "antd";
import Data from "../data/details.json";
import { COMPANY_NAME } from "../Constants/dictionary";

const { Header, Content, Footer, Sider } = Layout;

export const PageSturcture = () => {
  const [selectedElement, setSelectedElement] = useState<string>();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleChange = (value: string) => {
    setSelectedElement(value);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
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
        <Header
          className="header"
          style={{ padding: 0, background: colorBgContainer }}
        >
          {`${COMPANY_NAME.toUpperCase()}`}
        </Header>
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
            <div className="forms">
              {selectedElement === "individual" ? (
                <div className="individual_form">
                  <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 700 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    {Array.from(
                      new Set(
                        Data &&
                          Data.details.map((item, index) => {
                            return (
                              <Form.Item
                                label={Object.keys(item.fields)}
                                rules={[
                                  {
                                    required: true,
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            );
                          })
                      )
                    )}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              ) : (
                <div className="company_form">
                  <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 700 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    {Array.from(
                      new Set(
                        Data &&
                          Data.details.map((item, index) => {
                            const labels = Object.keys(item.fields);
                            return (
                              <Form.Item
                                label={`${labels}`}
                                rules={[
                                  {
                                    required: true,
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            );
                          })
                      )
                    )}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </Content>
        <Footer className="footer_text" style={{ textAlign: "center" }}>
          {`${COMPANY_NAME.toUpperCase()}`}
        </Footer>
      </Layout>
    </Layout>
  );
};
