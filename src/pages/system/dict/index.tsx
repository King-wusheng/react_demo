import {
  ProTable,
  type ProColumns,
  ActionType,
} from "@ant-design/pro-components";
import { fetchDictList } from "./components/service";
import DictForm from "./components/form";
import { Button } from "antd";
import { useRef } from "react";
const dictTable = () => {
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
      title: "字典名称",
      dataIndex: "name",
    },
    {
      title: "字典类型",
      dataIndex: "type",
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
      valueType: "dateRange",
      fieldProps: {
        format: "YYYY-MM-DD HH:mm:ss",
      },
      hideInTable: true,
      search: {
        transform: (values: any[]) => {
          return {
            startTime: values[0],
            endTime: values[1],
          };
        },
      },
    },
    {
      title: "操作",
      width: 200,
      search: false,
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            <DictForm
              type="edit"
              trigger={
                <Button color="primary" variant="text">
                  编辑
                </Button>
              }
              success={() => {
                console.log("编辑成功");
              }}
              item={record}
            />

            <Button color="danger" variant="text">
              删除
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <ProTable
        actionRef={actionRef}
        className="pro-table-fixed-scroll"
        scroll={{ y: "calc(100vh - 430px)" }}
        columns={columns}
        request={fetchDictList}
        rowKey="id"
        toolBarRender={() => [
          <DictForm
            type="add"
            trigger={<Button type="primary">添加</Button>}
            success={() => {
              console.log("添加成功");
            }}
            item={{}}
          />,
        ]}
      />
    </div>
  );
};

export default dictTable;
