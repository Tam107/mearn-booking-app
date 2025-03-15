import {configureStore} from "@reduxjs/toolkit"
import { UserReducer } from "./reducers/UserReducer";
import { AdminReducer } from "./reducers/AdminReducer";
import { WishlistReducer } from "./reducers/WishlistReducer";

const Store = configureStore({
    reducer:{
        UserReducer:UserReducer,
        AdminReducer:AdminReducer,
        AdminReducer:AdminReducer,
        WishlistReducer:WishlistReducer,
    }
})

export default Store;