import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "../../src/entity/User";


///异步调用的示例（异步调用被拆分为函数本身和函数结果两个部分）
// export const increaseAsync=createAsyncThunk(
//     "counter/fetchCount",
//     async (amount)=>{
//         const response=await fetchCount(amount);
//         console.log(response);
//         return response;
//     }
// )
interface IInitialState{
    isLogin:boolean,
    // user:{}|User
    user:any
}
let initialState:IInitialState= {
    isLogin: false,
    user: {}
}
//创建一个slice需要一个名字来标识他，一个初始的state值和多个reducer来定义如何更新state。
// 创建 slice 后，我们可以导出生成的 Redux action creators 和整个 slice reducer 函数。
export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        login: (state, action:PayloadAction<User>) => {
            ///携带的数据在action.payload属性中
            // console.log(action.payload);
            state.isLogin=true;
            state.user=action.payload;
        },
        loginOut: (state) => {
            state.isLogin=false;
            state.user={};

        },
    },
    //异步函数的调用，函数分为三种状态pending（等待），fulfulled（成功），rejected（失败）
    extraReducers: (builder) => {
        // builder.addCase(increaseAsync.pending,(state)=>{
        //     state.status="loading"
        // })
        //     .addCase(increaseAsync.fulfilled,(state,action)=>{
        //         state.status="okk";
        //         state.value+=action.payload;
        //     })
    }

});
// 为每个 case reducer 函数生成 Action creators
export const {login,loginOut} = counterSlice.actions;
export default counterSlice.reducer;


////一些小辅助函数
function fetchCount(amount: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(amount);
        }, 1000)
    })


}