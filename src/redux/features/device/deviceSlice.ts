import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface DeviceState {
  value: boolean;
}

// Define the initial state using that type
const initialState: DeviceState = {
  value: false,
};

export const deviceSlice = createSlice({
  name: "isOpen",
  initialState,
  reducers: {
    toggleState: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleState } = deviceSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsOpen = (state: RootState) => state.isOpen.value;

export default deviceSlice.reducer;
