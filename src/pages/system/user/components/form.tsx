import { ModalForm, ProFormText } from "@ant-design/pro-components";
import type { UserItem } from "./data";
const UserForm = ({
  trigger,
  success,
  mode,
  item,
}: {
  trigger: any;
  success: () => void;
  mode: String;
  item: UserItem;
}) => {
  return (
    <div>
      <ModalForm
        layout="horizontal"
        title={mode == "add" ? "新增用户" : "编辑用户"}
        trigger={trigger}
        onFinish={async (values) => {
          console.log("values", values);
          success();
        }}
        initialValues={item}
        labelAlign="right"
        labelCol={{ flex: "100px" }}
      >
        <ProFormText name="name" label="用户名" />
        <ProFormText name="nickName" label="昵称" />
        <ProFormText name="deptId" label="部门" />
        <ProFormText
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: "请输入邮箱" },
            {
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: "请输入正确的邮箱",
            },
          ]}
        />
        <ProFormText
          name="phone"
          label="手机号"
          rules={[
            { required: true, message: "请输入手机号" },
            { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" },
          ]}
        />
      </ModalForm>
    </div>
  );
};

export default UserForm;
