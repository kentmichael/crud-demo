import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: 0,
}

const updateSlice = createSlice({
  name: "itemToUpdate",
  initialState,
  reducers: {
    setIdToUpdate: (state, action) => {
      state.id = action.payload
    },
  },
})

export default updateSlice.reducer
export const { setIdToUpdate } = updateSlice.actions
