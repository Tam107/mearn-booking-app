import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    loading:true   
}
export const RoomReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('roomCreateRequest', (state) => {
            state.loading = true;
        })
        .addCase('roomCreateSuccess', (state, action) => {
            state.loading = false;
            state.room = action.payload;
            state.success = true;
        })
        .addCase('roomCreateFailed', (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
        .addCase('getAllRoomRequest',(state)=>{
            state.loading = true;
        })
        .addCase('getAllRoomSucess',(state,action)=>{
            state.loading = false;
            state.rooms = action.payload;

        })
        .addCase('getAllRoomFailed',(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        .addCase('deleteRoomRequest', (state) => {
            state.loading = true;
        })
        .addCase('deleteRoomSuccess', (state, action) => {
            state.loading = false;
            state.rooms = state.rooms.filter(room => !action.payload.includes(room._id));
        })
        .addCase('deleteRoomFailed', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
        )

     
        // .addCase('ClearErrors', (state) => {
        //     state.error = null;
        // })
        
});
