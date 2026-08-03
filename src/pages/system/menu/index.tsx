import {
  ProTable,
  type ProColumns,
  type ActionType,
} from "@ant-design/pro-components";
import { Button } from "antd";
import { useRef } from "react";
import { getMenuList } from "./components/service";
import MenuForm from "./components/form";
import type { MenuItem } from "./components/data";
const MenuList = () => {
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
      title: "菜单名称",
      dataIndex: "name",
    },
    {
      title: "类型",
      dataIndex: "type",
      search: false,
    },
    {
      title: "排序",
      dataIndex: "sort",
      search: false,
    },
    {
      title: "权限标识",
      dataIndex: "permission",
      search: false,
    },
    {
      title: "组件路径",
      dataIndex: "component",
      search: false,
    },

    {
      title: "状态",
      dataIndex: "status",
      valueType: "select",
      valueEnum: {
        0: "正常",
        1: "禁用",
      },
    },
    {
      width: 200,
      title: "操作",
      search: false,
      dataIndex: "action",
      render: (text, record) => [
        <MenuForm
          key="add"
          type="edit"
          trigger={
            <Button color="primary" variant="text" key="edit">
              编辑
            </Button>
          }
          success={() => {
            actionRef.current?.reload();
          }}
          item={record as MenuItem}
        />,

        <Button color="danger" variant="text" key="delete">
          删除
        </Button>,
      ],
    },
  ];
  return (
    <div>
      <ProTable
        className="pro-table-fixed-scroll"
        scroll={{ y: "calc(100vh - 430px)" }}
        columns={columns}
        request={getMenuList}
        rowKey="id"
        actionRef={actionRef}
        toolBarRender={() => [
          <MenuForm
            key="add"
            type="add"
            trigger={
              <Button color="primary" variant="text" key="add">
                新增
              </Button>
            }
            success={() => {
              actionRef.current?.reload();
            }}
            item={{} as MenuItem}
          />,
        ]}
      />
    </div>
  );
};
export default MenuList;
