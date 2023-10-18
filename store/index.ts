import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./reducer/userSlice"

///创建一个空的reducer
export const store = configureStore({
    reducer:{
        user:userReducer   ////如果有多个redux内容就写多个键值对
    }
});
// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store
