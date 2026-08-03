import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import type { RoleItem } from "./data";
import { Button, Form, message } from "antd";
const roleForm = ({
  type,
  trigger,
  onSuccess,
  item,
}: {
  type: String;
  trigger: any;
  onSuccess: () => void;
  item: RoleItem;
}) => {
  console.log(item);
  return (
    <div>
      <ModalForm
        layout="horizontal"
        title={type == "add" ? "新增角色" : "编辑角色"}
        trigger={trigger}
        onFinish={async (values) => {
          console.log(values);
          onSuccess();
        }}
        initialValues={item}
        labelAlign="right"
        labelCol={{ flex: "100px" }}
      >
        <ProFormText name="name" label="角色名称" />
        <ProFormText name="permission" label="权限字符" />
        <ProFormText name="sort" label="序号" />
      </ModalForm>
    </div>
  );
};
export default roleForm;
