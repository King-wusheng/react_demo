import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormDigit,
  ProFormTextArea,
} from "@ant-design/pro-components";
const PostForm = ({
  trigger,
  type,
  success,
  item,
}: {
  trigger: any;
  type: string;
  success: () => void;
  item: any;
}) => {
  return (
    <ModalForm
      layout="horizontal"
      labelAlign="right"
      labelCol={{ flex: "100px" }}
      title={type === "add" ? "添加职位" : "编辑职位"}
      trigger={trigger}
      onFinish={async (values: any) => {
        console.log(values);
        success();
        return true;
      }}
      initialValues={item}
    >
      <ProFormText
        name="name"
        label="岗位名称"
        placeholder="请输入岗位名称"
        rules={[{ required: true, message: "请输入岗位名称" }]}
      />
      <ProFormText
        name="code"
        label="岗位编码"
        placeholder="请输入编码名称"
        rules={[{ required: true, message: "请输入岗位编码" }]}
      />
      <ProFormDigit
        name="sort"
        label="岗位顺序"
        min={0}
        rules={[{ required: true, message: "请输入岗位顺序" }]}
      />
      <ProFormRadio.Group
        name="status"
        label="岗位状态"
        options={[
          { label: "正常", value: 1 },
          { label: "停用", value: 0 },
        ]}
      />
      <ProFormTextArea
        name="remark"
        label="备注"
        placeholder="请输入内容"
        fieldProps={{ rows: 4 }}
      />
    </ModalForm>
  );
};
export default PostForm;
