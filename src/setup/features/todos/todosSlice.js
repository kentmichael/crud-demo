import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isLoading: false,
  todos: [],
  errorMessage: "",
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.data)
})

const todoDetails = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false
      state.todos = action.payload
      state.errorMessage = ""
    })
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false
      state.todos = []
      state.errorMessage = action.error.message
    })
  },
})

export default todoDetails.reducer
