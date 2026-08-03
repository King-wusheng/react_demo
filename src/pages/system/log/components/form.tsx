import { Button, Modal, Tag, Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { ReactElement } from "react";

const businessTypeMap: Record<number, string> = {
  0: "其他",
  1: "新增",
  2: "修改",
  3: "删除",
};

const Section = ({
  title,
  extra,
  children,
}: {
  title: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div style={{ marginBottom: 16 }}>
    <div
      style={{
        background: "#f5f5f5",
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{title}</span>
      {extra}
    </div>
    <div
      style={{
        padding: "12px 16px",
        border: "1px solid #f0f0f0",
        borderTop: 0,
      }}
    >
      {children}
    </div>
  </div>
);

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div style={{ display: "flex", marginBottom: 8 }}>
    <span style={{ width: 90, color: "#666", textAlign: "right" }}>
      {label}：
    </span>
    <span style={{ flex: 1, paddingLeft: 8 }}>{value}</span>
  </div>
);

const LogDetail = ({ trigger, item }: { trigger: ReactElement; item: any }) => {
  const [open, setOpen] = useState(false);

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      <Modal
        title="操作日志详细"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={800}
      >
        <Section title="基本信息">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            <InfoRow label="操作模块" value={item.title} />
            <InfoRow
              label="业务类型"
              value={businessTypeMap[item.businessType] ?? "其他"}
            />
            <InfoRow label="操作时间" value={item.operTime} />
            <InfoRow
              label="执行状态"
              value={
                <Tag color={item.status === 0 ? "green" : "red"}>
                  {item.status === 0 ? "正常" : "失败"}
                </Tag>
              }
            />
          </div>
        </Section>

        <Section title="操作人员">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            <InfoRow label="操作人员" value={item.operName} />
            <InfoRow label="所属部门" value={item.deptName ?? "源达集团"} />
            <InfoRow label="操作地址" value={item.operIp} />
          </div>
        </Section>

        <Section title="请求信息">
          <InfoRow
            label="请求地址"
            value={
              <>
                <Tag color="green">{item.requestMethod}</Tag>{" "}
                {item.operUrl ?? "/midres/api/data-source/3"}
              </>
            }
          />
          <InfoRow
            label="操作方法"
            value={
              item.method ??
              "com.ydbp.controller.DataSourceController.getById()"
            }
          />
          <InfoRow label="消耗时间" value={`${item.costTime} 毫秒`} />
        </Section>

        <Section
          title="请求参数"
          extra={
            <Button
              type="link"
              size="small"
              icon={<CopyOutlined />}
              onClick={() => copyText(item.operParam || "(无数据)")}
            >
              复制
            </Button>
          }
        >
          <Typography.Text type="secondary">
            {item.operParam || "(无数据)"}
          </Typography.Text>
        </Section>

        <Section
          title="返回参数"
          extra={
            <Button
              type="link"
              size="small"
              icon={<CopyOutlined />}
              onClick={() =>
                copyText(
                  item.jsonResult
                    ? JSON.stringify(item.jsonResult, null, 2)
                    : "",
                )
              }
            >
              复制
            </Button>
          }
        >
          <pre
            style={{
              margin: 0,
              maxHeight: 240,
              overflow: "auto",
              background: "#fafafa",
              padding: 12,
              borderRadius: 4,
            }}
          >
            {item.jsonResult
              ? JSON.stringify(item.jsonResult, null, 2)
              : "(无数据)"}
          </pre>
        </Section>
      </Modal>
    </>
  );
};

export default LogDetail;
