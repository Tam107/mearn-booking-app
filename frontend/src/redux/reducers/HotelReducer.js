import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    loading:true   
}
export const HotelReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('hotelCreateRequest', (state) => {
            state.loading = true;
        })
        .addCase('hotelCreateSuccess', (state, action) => {
            state.loading = false;
            state.hotel = action.payload;
            state.success = true;
        })
        .addCase('hotelCreateFailed', (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
        .addCase('getAllHotelRequest',(state)=>{
            state.loading = true;
        })
        .addCase('getAllHotelSucess',(state,action)=>{
            state.loading = false;
            state.hotels = action.payload;

        })
        .addCase('getAllHotelFailed',(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        .addCase('deleteHotelRequest', (state) => {
            state.loading = true;
        })
        .addCase('deleteHotelSuccess', (state, action) => {
            state.loading = false;
            state.hotels = state.hotels.filter(hotel => !action.payload.includes(hotel._id));
        })
        .addCase('deleteHotelFailed', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase('updateHotelRequest', (state) => {
            state.loading = true;
        })  
        .addCase('updateHotelSuccess', (state, action) => {
            state.loading = false;
            state.hotels = state.hotels.map(hotel => hotel._id === action.payload._id ? action.payload : hotel);
        })
        .addCase('updateHotelFailed', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // .addCase('ClearErrors', (state) => {
        //     state.error = null;
        // })
        
});
