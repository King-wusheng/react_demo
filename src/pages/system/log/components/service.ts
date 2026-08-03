export async function fetchLogList() {
  return {
    data: [
      {
        id: 5,
        title: "数据源管理-根据ID获取数据源",
        businessType: 0,
        requestMethod: "GET",
        operName: "admin",
        operIp: "192.168.1.44",
        deptName: "源达集团",
        status: 0,
        operTime: "2026-07-30 16:47:39",
        costTime: 2,
        operUrl: "/midres/api/data-source/3",
        method: "com.ydbp.controller.DataSourceController.getById()",
        operParam: "",
        jsonResult: {
          ret: 0,
          msg: "success",
          content: { id: "3", dsKey: "test_mysql" },
        },
      },
      {
        id: 4,
        title: "数据源管理-分页查询数据源",
        businessType: 0,
        requestMethod: "POST",
        operName: "admin",
        operIp: "192.168.1.44",
        status: 0,
        operTime: "2026-07-30 16:47:39",
        costTime: 8,
      },
    ],
  };
}
