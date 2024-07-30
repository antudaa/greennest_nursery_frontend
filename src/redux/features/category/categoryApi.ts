import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
type TCategoryState = {
    categoryName: null | string;
};

// Define the initial state
const initialState: TCategoryState = {
    categoryName: null,
};

// Create the slice
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        createCategory: (state, action: PayloadAction<{ categoryName: string }>) => {
            const { categoryName } = action.payload;
            state.categoryName = categoryName;
        }
    },
});

// Export the actions
export const { createCategory } = categorySlice.actions;

// Export the reducer
export default categorySlice.reducer;
