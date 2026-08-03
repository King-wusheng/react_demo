export async function fetchDeptList() {
  console.log("你好");
  return {
    data: [
      {
        id: 1,
        name: "源达集团",
        sort: 0,
        status: 1,
        createdAt: "2026-07-22 13:14:58",
        children: [
          {
            id: 2,
            name: "北京源达掌财科技有限公司",
            sort: 1,
            status: 1,
            createdAt: "2026-07-22 13:14:58",
            parentId: 1,
            children: [
              {
                id: 3,
                name: "技术中心",
                sort: 1,
                status: 1,
                createdAt: "2026-07-22 13:14:58",
                parentId: 2,
                children: [
                  {
                    id: 4,
                    name: "架构中台研发部",
                    sort: 2,
                    status: 1,
                    createdAt: "2026-07-22 13:14:58",
                    parentId: 3,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    code: 0,
  };
}
