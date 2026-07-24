import { PlusOutlined } from '@ant-design/icons';
import {
  type ActionType,
  type ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { request, useModel } from '@umijs/max';
import { App, Button, Input, Space, Tag } from 'antd';
import { useRef } from 'react';
import { removeRule } from '@/services/ant-design-pro/api';
import RuleForm from '../components/listForm';

type RuleItem = {
  key: number;
  name: string;
  desc: string;
  status: number;
};

const PracticeList = () => {
  const { initialState } = useModel('@@initialState');
  const {
    keyword,
    setKeyword,
    clearKeyword,
    recordAction,
    lastAction,
    setLastAction,
  } = useModel('practice');
  const { message } = App.useApp();
  const actionRef = useRef<ActionType>(null);

  const columns: ProColumns<RuleItem>[] = [
    {
      title: '名称',
      dataIndex: 'name', // 会出现在搜索区 + 表格列
    },
    {
      title: '描述',
      dataIndex: 'desc',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' },
        2: { text: '已上线', status: 'Success' },
        3: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <div>
            <RuleForm
              trigger={
                <Button
                  color="primary"
                  variant="link"
                  onClick={() => recordAction('点击编辑')}
                >
                  编辑
                </Button>
              }
              record={record}
              onSuccess={() => {
                actionRef.current?.reload();
                recordAction('编辑一条');
              }}
            />

            <Button
              color="danger"
              variant="text"
              onClick={async () => {
                await removeRule({ key: [record.key] });
                recordAction(`删除了 ${record.name}`);
                message.success('删除成功');
                actionRef.current?.reload();
              }}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];
  const user = initialState?.currentUser;
  console.log('用户信息', user);
  console.log('usemodel', keyword, lastAction);
  return (
    <div>
      <Space style={{ marginBottom: 12 }} wrap>
        <span>当前用户：{user?.name}</span>
        <Tag>{user?.access}</Tag>
        <Input
          allowClear
          placeholder="全局关键词（演示 store）"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 220 }}
        />
        <Button onClick={clearKeyword}>清空关键词</Button>
        {lastAction && <Tag color="blue">最近操作：{lastAction}</Tag>}
      </Space>
      <ProTable<RuleItem>
        actionRef={actionRef}
        rowKey="key"
        headerTitle="练习列表"
        columns={columns}
        sticky
        scroll={{ y: 'calc(100vh - 460px)' }}
        toolBarRender={() => [
          <RuleForm
            key="add"
            trigger={
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => recordAction('点击新增')}
              >
                新增
              </Button>
            }
            onSuccess={() => {
              actionRef.current?.reload();
              recordAction('新增一条');
            }}
          />,
        ]}
        request={async (params) => {
          // params 里通常有：current, pageSize, name, status ...
          const res = await request<{ data: RuleItem[]; total: number }>(
            '/api/rule',
            {
              method: 'GET',
              params,
            },
          );
          return {
            data: res.data || [],
            success: true,
            total: res.total || 0,
          };
        }}
      />
    </div>
  );
};

export default PracticeList;
