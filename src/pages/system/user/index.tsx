import { ProTable, type ProColumns } from "@ant-design/pro-components";
import { fetchUserList } from "./components/service";
import { Space, Button } from "antd";
import { useRef } from "react";
import type { ActionType } from "@ant-design/pro-components";
import UserForm from "./components/form";
import type { UserItem } from "./components/data";
import "./components/index.css";
const userList = () => {
  const actionRef = useRef<ActionType>(null);
  const columns: ProColumns<any>[] = [
    {
      title: "序号",
      width: 80,
      valueType: "index",
      search: false,
      fixed: "left", // 可选：固定左侧
    },
    {
      title: "用户名",
      dataIndex: "name",
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      search: false,
    },
    {
      title: "部门",
      dataIndex: "deptName",
      search: false,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      search: false,
    },
    {
      title: "手机号",
      dataIndex: "phone",
      search: false,
    },
    {
      title: "状态",
      dataIndex: "status",
      valueType: "select",
      valueEnum: {
        0: { text: "禁用", status: "Default" },
        1: { text: "启用", status: "Success" },
      },
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      search: false,
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
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
      title: "操作",
      dataIndex: "action",
      search: false,
      render: (text, record) => {
        return (
          <Space>
            <UserForm
              mode="edit"
              trigger={
                <Button color="primary" variant="text">
                  编辑
                </Button>
              }
              success={() => {
                actionRef.current?.reload();
              }}
              item={record as UserItem}
            />

            <Button color="danger" variant="text">
              删除
            </Button>
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
        columns={columns}
        request={fetchUserList}
        rowKey="id"
        actionRef={actionRef}
        toolBarRender={() => [
          <UserForm
            mode="add"
            trigger={<Button type="primary">新增</Button>}
            success={() => {
              actionRef.current?.reload();
            }}
            item={{} as UserItem}
          />,
        ]}
      />
    </div>
  );
};

export default userList;
