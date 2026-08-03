import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUser } from "@/store/userSlice";
import { PlusOutlined } from "@ant-design/icons";
import {
  type ActionType,
  type ProColumns,
  type ProDescriptionsItemProps,
  FooterToolbar,
  ProDescriptions,
  ProTable,
} from "@ant-design/pro-components";
import { useAccess, useModel } from "@umijs/max";
import { App, Button, Drawer, Input, Space, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import RuleForm from "../components/listForm";
import type { RuleItem } from "./data";
import "./index.css";
import { fetchRuleList, removeRules } from "./service";
const PracticeList = () => {
  const access = useAccess();
  const { initialState } = useModel("@@initialState");
  const count = useAppSelector((s) => {
    return s.userInfo.value;
  });
  console.log("count=====", count);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // dispatch(getUserInfo());
    try {
      dispatch(fetchUser(1)).unwrap();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const {
    keyword,
    setKeyword,
    clearKeyword,
    recordAction,
    lastAction,
    setLastAction,
  } = useModel("practice");
  const { message } = App.useApp();
  // 本地状态
  const actionRef = useRef<ActionType>(null);
  const [selectedRows, setSelectedRows] = useState<RuleItem[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [currentRow, setCurrentRow] = useState<RuleItem>();
  // 批量删除
  const handleBatchRemove = async () => {
    if (!selectedRows.length) {
      message.error("请选择要删除的行");
      return;
    }
    console.log("selectedRows=====", selectedRows);
  };

  const columns: ProColumns<RuleItem>[] = [
    {
      title: "名称",
      dataIndex: "name", // 会出现在搜索区 + 表格列
      render: (text, record) => (
        <Button
          style={{ padding: 0 }}
          type="link"
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
          }}
        >
          {text}
        </Button>
      ),
      fieldProps: {
        placeholder: "请输入名称",
        allowClear: true,
      },
    },
    {
      title: "描述",
      dataIndex: "desc",
      search: false,
    },
    {
      title: "状态",
      dataIndex: "status",
      valueType: "select",
      align: "center",
      valueEnum: {
        0: { text: "关闭", status: "Default" },
        1: { text: "运行中", status: "Processing" },
        2: { text: "已上线", status: "Success" },
        3: { text: "异常", status: "Error" },
      },
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      valueType: "dateRange",
      hideInTable: true,
      search: {
        // transform 用于将表单中 dateRange 的值转为接口所需的参数格式
        // value 是表单中 dateRange 的值，格式为 [startTime, endTime]
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
      align: "center",
      render: (text, record) => {
        return (
          <div className="flexOption">
            <RuleForm
              trigger={
                <Button
                  color="primary"
                  variant="link"
                  onClick={() => recordAction("点击编辑")}
                >
                  编辑
                </Button>
              }
              record={record}
              onSuccess={() => {
                actionRef.current?.reload();
                recordAction("编辑一条");
              }}
            />

            {access.canAdmin && (
              <Button
                color="danger"
                variant="text"
                onClick={async () => {
                  await removeRules([record.key]);
                  recordAction(`删除了 ${record.name}`);
                  message.success("删除成功");
                  actionRef.current?.reload();
                }}
              >
                删除
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  const user = initialState?.currentUser;

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
      {selectedRows.length > 0 && (
        <FooterToolbar
          extra={
            <span>
              已选 <strong>{selectedRows.length}</strong> 项
            </span>
          }
        >
          {access.canAdmin && (
            <Button danger onClick={handleBatchRemove}>
              批量删除
            </Button>
          )}
        </FooterToolbar>
      )}
      <ProTable<RuleItem>
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            console.log("selectedRowKeys=====", selectedRowKeys);
            console.log("selectedRows=====", selectedRows);
            setSelectedRows(selectedRows);
          },
        }}
        actionRef={actionRef}
        rowKey="key"
        columns={columns}
        sticky
        scroll={{ y: "calc(100vh - 460px)" }}
        toolBarRender={() => [
          <RuleForm
            key="add"
            trigger={
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => recordAction("点击新增")}
              >
                新增
              </Button>
            }
            onSuccess={() => {
              actionRef.current?.reload();
              recordAction("新增一条");
            }}
          />,
        ]}
        request={fetchRuleList}
      />
      <Drawer
        title="详情"
        open={showDetail}
        onClose={() => {
          setShowDetail(false);
          setCurrentRow(undefined);
        }}
      >
        {currentRow && (
          <ProDescriptions<RuleItem>
            column={1}
            title={currentRow.name}
            dataSource={currentRow}
            columns={columns as ProDescriptionsItemProps<RuleItem>[]}
          />
        )}
      </Drawer>
    </div>
  );
};

export default PracticeList;
