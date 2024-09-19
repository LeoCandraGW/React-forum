import api from "../../utils/api";
import { receiveForumsActionCreator } from "../thread/action";
import { receiveUsersActionCreator } from "../user/action";

function asyncPopulateUsersAndForum(){
    return async (dispatch) => {
        try {
            const users = await api.getAllUsers()
            const forums = await api.getAllThreads()

            dispatch(receiveUsersActionCreator(users))
            dispatch(receiveForumsActionCreator(forums))
        } catch (error){
            alert(error.message)
        }
    }
}

export {
    asyncPopulateUsersAndForum
}