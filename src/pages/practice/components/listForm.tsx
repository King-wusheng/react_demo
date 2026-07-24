type RuleItem = {
  key: number;
  name: string;
  desc: string;
  status: number;
};

import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { App } from 'antd';
import { addRule, updateRule } from '@/services/ant-design-pro/api';

type RuleFormProps = {
  trigger: React.ReactElement;
  record?: RuleItem; // 有 = 编辑，无 = 新增
  onSuccess: () => void;
};

const statusOptions = [
  { label: '关闭', value: 0 },
  { label: '运行中', value: 1 },
  { label: '已上线', value: 2 },
  { label: '异常', value: 3 },
];

const RuleForm = ({ trigger, record, onSuccess }: RuleFormProps) => {
  const { keyword, lastAction, setKeyword, setLastAction } =
    useModel('practice');
  const { message } = App.useApp();
  const isEdit = !!record;

  return (
    <div>
      <ModalForm
        title={isEdit ? '编辑' : '新增'}
        trigger={trigger}
        initialValues={
          isEdit
            ? {
                name: record.name,
                desc: record.desc,
                status: record.status,
              }
            : undefined
        }
        modalProps={{ destroyOnHidden: true }}
        onFinish={async (values) => {
          if (isEdit) {
            await updateRule({
              key: record.key,
              name: values.name,
              desc: values.desc,
              status: values.status,
            });
            message.success('编辑成功');
          } else {
            await addRule({
              name: values.name,
              desc: values.desc,
              status: values.status,
            });
            message.success('新建成功');
          }
          onSuccess();
          return true;
        }}
      >
        <ProFormText
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称' }]}
        />
        <ProFormTextArea name="desc" label="描述" />
        <ProFormSelect
          name="status"
          label="状态"
          rules={[{ required: true, message: '请选择状态' }]}
          options={statusOptions}
        />
      </ModalForm>
    </div>
  );
};

export default RuleForm;
