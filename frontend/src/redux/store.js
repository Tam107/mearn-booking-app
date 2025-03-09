import {configureStore} from "@reduxjs/toolkit"
import { UserReducer } from "./reducers/UserReducer";

const Store = configureStore({
    reducer:{
        UserReducer:UserReducer,
    }
})

export default Store;