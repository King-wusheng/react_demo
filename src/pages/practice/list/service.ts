import { request } from "@umijs/max";
import { removeRule as removeRuleApi } from "@/services/ant-design-pro/api";
import type { RuleItem } from "./data";

/** 列表查询参数：ProTable 会带上 current、pageSize 以及搜索字段 */
export type RuleListParams = {
  current?: number;
  pageSize?: number;
  name?: string;
  status?: number;
  startTime?: string;
  endTime?: string;
  [key: string]: unknown;
};

type RuleListResult = {
  data: RuleItem[];
  total: number;
};

/** 拉取规则列表 */
export async function fetchRuleList(params: RuleListParams) {
  const res = await request<RuleListResult>("/api/rule", {
    method: "GET",
    params,
  });

  return {
    data: res.data || [],
    success: true,
    total: res.total || 0,
  };
}

/** 删除（单条或多条）：传 key 数组 */
export async function removeRules(keys: number[]) {
  return removeRuleApi({ key: keys });
}
