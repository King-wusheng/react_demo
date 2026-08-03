import { ProTable, type ProColumns } from "@ant-design/pro-components";
import { postFetch } from "./components/service";
import PostForm from "./components/form";
import { Button, Tag } from "antd";
const PostList = () => {
  const columns: ProColumns<any>[] = [
    {
      title: "序号",
      width: 80,
      valueType: "index",
      search: false,
      fixed: "left", // 可选：固定左侧
    },
    {
      title: "职位编码",
      dataIndex: "code",
      search: false,
    },
    {
      title: "职位名称",
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
      search: false,
      render: (text: any, record: any) => {
        return (
          <Tag color={text === 1 ? "green" : "red"}>
            {text === 1 ? "正常" : "禁用"}
          </Tag>
        );
      },
    },
    {
      title: "操作",
      width: 200,
      dataIndex: "action",
      render: (text: any, record: any) => {
        return (
          <div>
            <PostForm
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
        className="pro-table-fixed-scroll"
        scroll={{ y: "calc(100vh - 430px)" }}
        columns={columns}
        request={postFetch}
        rowKey="id"
        toolBarRender={() => [
          <PostForm
            type="add"
            trigger={<Button type="primary">添加</Button>}
            success={() => {}}
            item={{}}
          />,
        ]}
      />
    </div>
  );
};
export default PostList;
