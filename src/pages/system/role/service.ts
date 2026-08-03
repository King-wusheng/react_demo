export async function fetchRoleList() {
  return {
    data: [
      {
        id: 1,
        name: "管理员",
        permission: "admin",
        sort: 1,
        status: 1,
        createdAt: "2026-07-29 10:00:00",
      },
    ],
    success: true,
    total: 1,
  };
}
