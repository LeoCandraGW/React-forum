import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authUserReducer from "./authUser/reducer";
import isPreLoadReducer from "./isPreload/reducer";
import forumDetailReducer from "./threadDetail/reducer";
import forumReducer from "./thread/reducer";
import usersReducer from "./user/reducer";

const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        isPreload: isPreLoadReducer,
        users: usersReducer,
        forums: forumReducer,
        forumDetail: forumDetailReducer,
        loadingBar: loadingBarReducer
    }
})

export default store;