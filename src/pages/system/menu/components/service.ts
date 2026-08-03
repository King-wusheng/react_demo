export async function getMenuList() {
  return {
    data: [
      {
        id: 1,
        name: "菜单1",
        type: 1,
        sort: 1,
        permission: "menu:list",
        component: "Menu1",
        status: 0,
      },
      {
        id: 2,
        name: "菜单2",
        type: 1,
        sort: 2,
        permission: "menu:list",
        component: "Menu2",
        status: 1,
      },
      {
        id: 3,
        name: "菜单3",
        type: 1,
        sort: 3,
        permission: "menu:list",
        component: "Menu3",
        status: 0,
      },
    ],
    code: 0,
  };
}
