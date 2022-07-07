import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  filterOption: "All",
  searchKeyword: "",
}

const filterSlice = createSlice({
  name: "filterAndSearch",
  initialState,
  reducers: {
    setFilterOption: (state, action) => {
      state.filterOption = action.payload
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload
    },
  },
})

export default filterSlice.reducer
export const { setFilterOption, setSearchKeyword } = filterSlice.actions
