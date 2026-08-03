export async function fetchUserList() {
  return {
    data: [
      {
        id: 1,
        name: "zhangsan",
        nickName: "张三",
        deptId: 1,
        deptName: "部门1",
        email: "zhangsan@example.com",
        phone: "12345678901",
        status: 1,
        createdAt: "2026-07-29 10:00:00",
        updatedAt: "2026-07-29 10:00:00",
      },
      {
        id: 2,
        name: "lisi",
        nickName: "李四",
        deptId: 2,
        deptName: "部门2",
        email: "lisi@example.com",
        phone: "12345678902",
        status: 1,
        createdAt: "2026-07-29 10:00:00",
        updatedAt: "2026-07-29 10:00:00",
      },
    ],
    success: true,
  };
}
