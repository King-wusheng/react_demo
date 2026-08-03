import {
  ProTable,
  type ProColumns,
  type ActionType,
} from "@ant-design/pro-components";
import { Button, Popconfirm } from "antd";
import { fetchDeptList } from "./components/service";
import { useState, type Key, useRef } from "react";
import DeptForm from "./components/form";
import styles from "./components/index.module.css";
const DeptList = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<Key[]>([]);
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
      title: "部门名称",
      dataIndex: "name",
    },
    {
      title: "排序",
      dataIndex: "sort",
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
      title: "创建时间",
      dataIndex: "createdAt",
      hideInTable: true,
      valueType: "dateRange",
      fieldProps: {
        format: "YYYY-MM-DD HH:mm:ss",
      },
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
      render: (text, record) => [
        <div style={{ display: "flex", paddingLeft: 0 }}>
          <DeptForm
            type="edit"
            trigger={
              <Button color="primary" variant="text">
                编辑
              </Button>
            }
            success={() => {
              console.log("success");
            }}
            item={record}
          />
          <Popconfirm
            title="提示"
            description={`确定要删除部门${record.name}吗？`}
            onConfirm={() => {
              console.log("确定删除");
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button color="danger" variant="text">
              删除
            </Button>
          </Popconfirm>
        </div>,
      ],
    },
  ];
  const collectKeys = (list: any[]): Key[] =>
    list.flatMap((item) => [
      item.id,
      ...(item.children ? collectKeys(item.children) : []),
    ]);
  return (
    <ProTable
      scroll={{ y: "calc(100vh - 400px)" }}
      className={styles.proTableFixedScroll}
      actionRef={actionRef}
      columns={columns}
      request={async (data) => {
        console.log(data);
        const res = await fetchDeptList();
        setExpandedRowKeys(collectKeys(res.data || []));
        return {
          data: res.data,
          success: true,
        };
      }}
      pagination={false}
      rowKey="id"
      expandable={{
        defaultExpandAllRows: true,
        expandedRowKeys,
        onExpandedRowsChange: (keys) => setExpandedRowKeys([...keys]),
      }}
      toolBarRender={() => [
        <DeptForm
          type="add"
          trigger={<Button type="primary">新增</Button>}
          success={() => {
            console.log("success");
          }}
          item={{}}
        />,
      ]}
    />
  );
};
export default DeptList;
