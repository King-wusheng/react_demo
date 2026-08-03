import {
  ModalForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const DictForm = ({
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
      title={type === "add" ? "添加字典类型" : "编辑字典类型"}
      width={520}
      trigger={trigger}
      labelAlign="right"
      labelCol={{ flex: "100px" }}
      initialValues={{
        status: 1, // 正常
        ...item,
      }}
      onFinish={async (values) => {
        console.log(values);
        success();
        return true;
      }}
    >
      <ProFormText
        name="name"
        label="字典名称"
        placeholder="请输入字典名称"
        rules={[{ required: true, message: "请输入字典名称" }]}
      />

      <ProFormText
        name="type"
        label={
          <span>
            字典类型
            <Tooltip title="字典类型用于区分不同字典，如 sys_user_sex">
              <QuestionCircleOutlined
                style={{ marginLeft: 4, color: "rgba(0,0,0,.45)" }}
              />
            </Tooltip>
          </span>
        }
        placeholder="请输入字典类型"
        rules={[{ required: true, message: "请输入字典类型" }]}
      />

      <ProFormRadio.Group
        name="status"
        label="状态"
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

export default DictForm;
