import { ProTable, type ProColumns } from "@ant-design/pro-components";
import { fetchLogList } from "./components/service";
import { Button, Tag } from "antd";
import LogDetail from "./components/form";
const businessTypeMap: Record<number, string> = {
  0: "其他",
  1: "新增",
  2: "修改",
  3: "删除",
  4: "授权",
  5: "导出",
  6: "导入",
  7: "强退",
  8: "生成代码",
  9: "清空数据",
};
const logList = () => {
  const columns: ProColumns<any>[] = [
    {
      title: "日志编号",
      dataIndex: "id",
      width: 80,
      search: false,
    },
    {
      title: "系统模块",
      dataIndex: "title",
      ellipsis: true,
    },
    {
      title: "操作类型",
      dataIndex: "businessType",
      search: false,
      render: (_, record) => (
        <Tag color="blue">{businessTypeMap[record.businessType] ?? "其他"}</Tag>
      ),
    },
    {
      title: "请求方式",
      dataIndex: "requestMethod",
      search: false,
    },
    {
      title: "操作人员",
      dataIndex: "operName",
      sorter: true,
    },
    {
      title: "操作地址",
      dataIndex: "operIp",
      search: false,
    },
    {
      title: "操作状态",
      dataIndex: "status",
      search: false,
      render: (text) => (
        <Tag color={text === 0 ? "blue" : "red"}>
          {text === 0 ? "成功" : "失败"}
        </Tag>
      ),
    },
    {
      title: "操作日期",
      dataIndex: "operTime",
      valueType: "dateTime",
      sorter: true,
      search: false,
    },
    {
      title: "消耗时间",
      dataIndex: "costTime",
      sorter: true,
      search: false,
      render: (text) => `${text}毫秒`,
    },
    {
      title: "操作",
      width: 100,
      search: false,
      render: (text, record) => (
        <LogDetail
          item={record}
          trigger={
            <Button color="primary" variant="text">
              详情
            </Button>
          }
        />
      ),
    },
  ];

  return (
    <div>
      <ProTable
        className="pro-table-fixed-scroll"
        scroll={{ y: "calc(100vh - 430px)" }}
        rowKey="id"
        columns={columns}
        request={fetchLogList}
      />
    </div>
  );
};
export default logList;
