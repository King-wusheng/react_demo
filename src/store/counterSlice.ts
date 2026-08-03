import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
  name: "张三",
  age: 18,
  sex: "男",
  city: "北京",
  country: "中国",
  email: "zhangsan@gmail.com",
  phone: "1234567890",
  address: "北京市海淀区",
  zip: "100000",
};
const counterSlice = createSlice({
  name: "counter",

  initialState,
  // 函数集合 只能修改变量不能发送请求
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    addByAmount(state, action) {
      state.value += action.payload;
    },
    reset(state) {
      return initialState;
    },
    getUserInfo(state) {
      const str = `我叫${state.name},年龄${state.age},性别${state.sex},城市${state.city},国家${state.country},邮箱${state.email},电话${state.phone},地址${state.address},邮编${state.zip}`;
      console.log(str);
    },
  },
});
// 给组件用：dispatch(increment())
export const { increment, decrement, addByAmount, reset, getUserInfo } =
  counterSlice.actions;
// 给 store 用：挂到 configureStore
export default counterSlice.reducer;
