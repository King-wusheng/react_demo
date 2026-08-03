import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormRadio,
  ProFormSwitch,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormDigit,
  ProFormDependency,
} from "@ant-design/pro-components";
import type { MenuItem } from "./data";
import { Row, Col } from "antd";
const menuForm = ({
  type,
  trigger,
  success,
  item,
}: {
  type: string;
  trigger: any;
  success: () => void;
  item: MenuItem;
}) => {
  return (
    <ModalForm
      layout="horizontal"
      title={type == "add" ? "新增菜单" : "编辑菜单"}
      width="50%"
      labelAlign="right"
      labelCol={{ flex: "100px" }}
      trigger={trigger}
      initialValues={{
        ...item,
        parentId: 0,
        menuType: "M",
        isFrame: 1,
        visible: 0,
        status: 0,
        isCache: 0,
      }}
      onFinish={async (values) => {
        console.log(values);
        success();
      }}
    >
      <ProFormSelect
        name="parentId"
        label="上级菜单"
        options={[{ label: "主类目", value: 0 }]}
      />
      <ProFormRadio.Group
        name="menuType"
        label="菜单类型"
        options={[
          { label: "目录", value: "M" },
          { label: "菜单", value: "C" },
          { label: "按钮", value: "F" },
        ]}
      />
      <ProFormDependency name={["menuType"]}>
        {({ menuType }) => {
          const isDir = menuType === "M";
          const isMenu = menuType === "C";
          const isBtn = menuType === "F";
          return (
            <>
              {/* 目录 / 菜单：图标 + 排序 */}
              {!isBtn && (
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      name="icon"
                      label="菜单图标"
                      placeholder="点击选择图标"
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormDigit
                      name="sort"
                      label="显示排序"
                      rules={[{ required: true }]}
                    />
                  </Col>
                </Row>
              )}
              {/* 按钮：排序 + 名称 */}
              {isBtn && (
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormDigit
                      name="sort"
                      label="显示排序"
                      rules={[{ required: true }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      name="name"
                      label="菜单名称"
                      rules={[{ required: true }]}
                    />
                  </Col>
                </Row>
              )}
              {/* 目录 / 菜单：名称 +（菜单才有路由名称 / 目录是外链） */}
              {isDir && (
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      name="name"
                      label="菜单名称"
                      rules={[{ required: true }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormRadio.Group
                      name="isFrame"
                      label="是否外链"
                      options={[
                        { label: "是", value: 0 },
                        { label: "否", value: 1 },
                      ]}
                    />
                  </Col>
                </Row>
              )}
              {isMenu && (
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      name="name"
                      label="菜单名称"
                      rules={[{ required: true }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText name="routeName" label="路由名称" />
                  </Col>
                </Row>
              )}
              {/* 目录：路由地址 + 显示状态 */}
              {isDir && (
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      name="path"
                      label="路由地址"
                      rules={[{ required: true }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormRadio.Group
                      name="visible"
                      label="显示状态"
                      options={[
                        { label: "显示", value: 0 },
                        { label: "隐藏", value: 1 },
                      ]}
                    />
                  </Col>
                </Row>
              )}
              {/* 菜单：外链 + 路由地址；组件路径 + 权限；参数 + 缓存；显示 + 状态 */}
              {isMenu && (
                <>
                  <Row gutter={16}>
                    <Col span={12}>
                      <ProFormRadio.Group
                        name="isFrame"
                        label="是否外链"
                        options={[
                          { label: "是", value: 0 },
                          { label: "否", value: 1 },
                        ]}
                      />
                    </Col>
                    <Col span={12}>
                      <ProFormText
                        name="path"
                        label="路由地址"
                        rules={[{ required: true }]}
                      />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <ProFormText name="component" label="组件路径" />
                    </Col>
                    <Col span={12}>
                      <ProFormText name="permission" label="权限字符" />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <ProFormText name="query" label="路由参数" />
                    </Col>
                    <Col span={12}>
                      <ProFormRadio.Group
                        name="isCache"
                        label="是否缓存"
                        options={[
                          { label: "缓存", value: 0 },
                          { label: "不缓存", value: 1 },
                        ]}
                      />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <ProFormRadio.Group
                        name="visible"
                        label="显示状态"
                        options={[
                          { label: "显示", value: 0 },
                          { label: "隐藏", value: 1 },
                        ]}
                      />
                    </Col>
                    <Col span={12}>
                      <ProFormRadio.Group
                        name="status"
                        label="菜单状态"
                        options={[
                          { label: "正常", value: 0 },
                          { label: "停用", value: 1 },
                        ]}
                      />
                    </Col>
                  </Row>
                </>
              )}
              {/* 目录：只有菜单状态 */}
              {isDir && (
                <ProFormRadio.Group
                  name="status"
                  label="菜单状态"
                  options={[
                    { label: "正常", value: 0 },
                    { label: "停用", value: 1 },
                  ]}
                />
              )}
              {/* 按钮：权限字符 + 菜单状态 */}
              {isBtn && (
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText name="permission" label="权限字符" />
                  </Col>
                  <Col span={12}>
                    <ProFormRadio.Group
                      name="status"
                      label="菜单状态"
                      options={[
                        { label: "正常", value: 0 },
                        { label: "停用", value: 1 },
                      ]}
                    />
                  </Col>
                </Row>
              )}
            </>
          );
        }}
      </ProFormDependency>
    </ModalForm>
  );
};

export default menuForm;
