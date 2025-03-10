import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    loading:true   
}
export const AdminReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('LoadAdminRequest', (state) => {
            state.loading = true;
        })
        .addCase('LoadAdminSuccess', (state, action) => {
            state.loading = false;
            state.isAdmin = true;
            state.data = action.payload;
        })
        .addCase('LoadAdminFail', (state, action) => {
            state.loading = false;
            state.isAdmin = false;
            state.error = action.payload;
        })
        // .addCase('ClearErrors', (state) => {
        //     state.error = null;
        // })
        .addCase('LogoutAdminSuccess', (state) => {
            state.isAuthenticated=false   
            state.loading = false;
            state.user = null
        });
});
