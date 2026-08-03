import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// type 类型(slice名/操作名  保证唯一性)
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (id: number) => {},
  {
    condition: async (id, { getState }) => {
      const res = await fetch(`/api/user/${id}`);
      console.log("发送请求", res);
    },
  }
);

const initialState = {
  name: "张三",
  age: 18,
  sex: "男",
  city: "北京",
  country: "中国",
  email: "zhangsan@gmail.com",
  phone: "1234567890",
  address: "北京市海淀区",
  zip: "100000",
  loading: false,
};
const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 监听异步三阶段
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true;
        console.log("异步请求pending");
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log("异步请求成功:", action);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        console.log("异步请求失败:", action);
      });
  },
});

export default userSlice.reducer;
