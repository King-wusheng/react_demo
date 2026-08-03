import {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect,
} from "@ant-design/pro-components";
import { Col, Row } from "antd";
import { fetchDeptList } from "./service";
const DeptForm = ({
  type,
  trigger,
  success,
  item,
}: {
  type: string;
  trigger: any;
  success: () => void;
  item: any;
}) => {
  return (
    <ModalForm
      layout="horizontal"
      labelAlign="right"
      labelCol={{ flex: "100px" }}
      title={type === "add" ? "添加部门" : "编辑部门"}
      width={680}
      trigger={trigger}
      initialValues={{
        sort: 0,
        status: 0,
        ...item,
      }}
      onFinish={async (values) => {
        console.log(values);
        success();
        return true; // 关闭弹窗
      }}
    >
      <ProFormTreeSelect
        name="parentId"
        label="上级部门"
        placeholder="选择上级部门"
        rules={[{ required: true, message: "请选择上级部门" }]}
        request={async () => {
          const res = await fetchDeptList();
          const toTree = (list: any[] = []): any[] =>
            list.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
              children: item.children?.length
                ? toTree(item.children)
                : undefined,
            }));
          return toTree(res.data);
        }}
        fieldProps={{
          treeDefaultExpandAll: true,
          showSearch: true,
          treeNodeFilterProp: "title",
        }}
      />

      <Row gutter={16}>
        <Col span={12}>
          <ProFormText
            name="name"
            label="部门名称"
            placeholder="请输入部门名称"
            rules={[{ required: true, message: "请输入部门名称" }]}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name="sort"
            label="显示排序"
            min={0}
            rules={[{ required: true, message: "请输入显示排序" }]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <ProFormText
            name="leader"
            label="负责人"
            placeholder="请输入负责人"
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="phone"
            label="联系电话"
            placeholder="请输入联系电话"
            rules={[
              { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" },
            ]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <ProFormText
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            rules={[{ type: "email", message: "请输入正确的邮箱" }]}
          />
        </Col>
        <Col span={12}>
          <ProFormRadio.Group
            name="status"
            label="部门状态"
            options={[
              { label: "正常", value: 1 },
              { label: "停用", value: 0 },
            ]}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};

export default DeptForm;
