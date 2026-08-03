export async function postFetch() {
  return {
    data: [
      {
        id: 1,
        name: "普通员工",
        code: "user",
        sort: 1,
        status: 1,
      },
      {
        id: 2,
        name: "管理员",
        code: "admin",
        sort: 2,
        status: 1,
      },
    ],
    total: 1,
    success: true,
  };
}
