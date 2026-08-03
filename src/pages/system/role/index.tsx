import {
  type ActionType,
  type ProColumns,
  type ProDescriptionsItemProps,
  FooterToolbar,
  ProDescriptions,
  ProTable,
} from "@ant-design/pro-components";
import { useState, useRef } from "react";
import { fetchRoleList } from "./service";
import { Switch, Space, Button, Popconfirm } from "antd";
import RoleForm from "./components/form";
import type { RoleItem } from "./components/data";
const roleList = () => {
  const actionRef = useRef<ActionType>(null);
  const handleDelete = (e: RoleItem) => {
    console.log("触发删除", e);
  };
  const columns: ProColumns<any>[] = [
    {
      title: "序号",
      width: 80,
      valueType: "index",
      search: false,
      fixed: "left", // 可选：固定左侧
    },
    {
      title: "角色名称",
      dataIndex: "name",
    },
    {
      title: "权限字符",
      dataIndex: "permission",
      search: false,
    },
    {
      title: "显示顺序",
      dataIndex: "sort",
      search: false,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (text) => (
        <Switch
          checked={text === 1}
          onChange={(checked) => {
            console.log("切换状态", checked);
          }}
        />
      ),
      valueType: "select",
      valueEnum: {
        0: { text: "关闭", status: "Default" },
        2: { text: "启用", status: "Success" },
      },
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      search: false,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      valueType: "dateRange",
      hideInTable: true,
      search: {
        transform: (value: any) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      width: 200,
      title: "操作",
      dataIndex: "action",
      search: false,
      render: (text, record) => {
        return (
          <Space>
            <RoleForm
              key="edit"
              type="edit"
              trigger={<Button type="primary">编辑</Button>}
              onSuccess={() => {
                actionRef.current?.reload();
              }}
              item={record}
            />
            <Popconfirm
              title="提示"
              description={`确定要删除角色${record.name}吗？`}
              onConfirm={() => handleDelete(record)}
              onOpenChange={() => console.log("open change")}
            >
              <Button type="primary">删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <ProTable
        className="pro-table-fixed-scroll"
        scroll={{ y: "calc(100vh - 430px)" }}
        actionRef={actionRef}
        columns={columns}
        request={async () => fetchRoleList()}
        rowKey="id"
        toolBarRender={() => [
          <RoleForm
            key="add"
            type="add"
            trigger={<Button type="primary">新增</Button>}
            onSuccess={() => {
              actionRef.current?.reload();
            }}
            item={{} as RoleItem}
          />,
        ]}
      />
    </div>
  );
};

export default roleList;
