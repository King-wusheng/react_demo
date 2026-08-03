export async function fetchDictList() {
  return {
    data: [
      {
        id: 1,
        name: "字典名称",
        type: "字典类型",
        status: 1,
        createdAt: "2021-01-01 12:00:00",
      },
      {
        id: 2,
        name: "字典名称2",
        type: "字典类型2",
        status: 0,
        createdAt: "2021-01-01 12:00:00",
      },
    ],
  };
}
