import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    loading: true,
}
export const BusReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('getAllBoardingAdminRequest', (state) => {
            state.loading = true;
        })
        .addCase('getAllBoardingAdminSuccess', (state, action) => {
            state.loading = false;
            state.boardingPointsAdmin = action.payload;
        })
        .addCase('getAllBoardingAdminFailed', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // add
        .addCase('addBoardingAdminRequest', (state) => {
            state.loading = true;
        })
        .addCase('addBoardingAdminSuccess', (state, action) => {
            state.loading = false;
            state.boardingPointsAdmin = [...state.boardingPointsAdmin, action.payload];
        })
        .addCase('addBoardingAdminFailed', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //delete
        .addCase('deleteBoardingAdminRequest', (state) => {
            state.loading = true;
        })
        .addCase('deleteBoardingAdminSuccess', (state, action) => {
            state.loading = false;
            state.boardingPointsAdmin = state.boardingPointsAdmin.filter(point => point._id !== action.payload._id);
        })
        .addCase('deleteBoardingAdminFailed', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //update
        .addCase("updateBoardingAdminRequest", (state) => {
            state.loading = true;
        }
        )
        .addCase("updateBoardingAdminSuccess", (state, action) => {
            state.loading = false;
            state.boardingPointsAdmin = state.boardingPointsAdmin.map(point =>
                point._id === action.payload._id ? action.payload : point
            );
        })
        .addCase("updateBoardingAdminFailed", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // arrival
        .addCase("getAllArrivalAdminRequest", (state) => {
            state.loading = true;
        })
        .addCase("getAllArrivalAdminSuccess", (state, action) => {
            state.loading = false;
            state.arrivalPointsAdmin = action.payload
        })
        .addCase('getAllArrivalAdminFailed', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // arrival add
        .addCase('addArrivalAdminRequest', (state) => {
            state.loading = true;
        })
        .addCase('addArrivalAdminSuccess', (state, action) => {
            state.loading = false;
            state.arrivalPointsAdmin = [...state.arrivalPointsAdmin, action.payload];
        })
        .addCase('addArrivalAdminFailed', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //arrival delete
        .addCase('deleteArrivalAdminRequest', (state) => {
            state.loading = true;
        })
        .addCase('deleteArrivalAdminSuccess', (state, action) => {
            state.loading = false;
            state.arrivalPointsAdmin = state.arrivalPointsAdmin.filter(point => point._id !== action.payload._id);
        })
        .addCase('deleteArrivalAdminFailed', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // arrival update
        .addCase("updateArrivalAdminRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateArrivalAdminSuccess", (state, action) => {
            state.loading = false;
            state.arrivalPointsAdmin = state.arrivalPointsAdmin.map(point =>
                point._id === action.payload._id ? action.payload : point
            );
        })
        .addCase("updateArrivalAdminFailed", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //create
        .addCase("createBusAdminRequest", (state) => {
            state.loading = true;
        })
        .addCase("createBusAdminSuccess", (state, action) => {
            state.loading = false;
            state.busesAdmin = [...state.busesAdmin, action.payload];
        })
        .addCase("createBusAdminFailed", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        //get bus
        .addCase("getAllBusesAdminRequest", (state) => {
            state.loading = true;
        })
        .addCase("getAllBusesAdminSuccess", (state, action) => {
            state.loading = false;
            state.busesAdmin = action.payload;
        })
        .addCase("getAllBusesAdminFailed", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

});
