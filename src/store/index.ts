import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import userSlice from "./userSlice";
export const store = configureStore({
  reducer: {
    //key 是 state 上的路径，value 是各 slice 的 reducer
    userInfo: counterReducer,
    userMessage: userSlice,
  },
});
// 	整棵 state 的 TypeScript 类型（给 useSelector 用）
export type RootState = ReturnType<typeof store.getState>;
// dispatch 的类型（给异步 thunk 等用）
export type AppDispatch = typeof store.dispatch;
