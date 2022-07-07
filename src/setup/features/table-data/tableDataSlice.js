import { createSlice } from "@reduxjs/toolkit"

const storageData = JSON.parse(localStorage.getItem("crud-demo-data")) ?? {
  loading: true,
  data: [],
  errorMessage: "",
}

const initialState = storageData

const tableDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.errorMessage = ""
      localStorage.setItem("crud-demo-data", JSON.stringify(state))
    },

    setErrorMessage: (state, action) => {
      state.loading = false
      state.data = []
      state.errorMessage = action.payload
    },

    addItem: (state, action) => {
      const { name, title } = action.payload
      const { data } = state
      const userIdSet = new Set()

      const existingUser = data.find(
        (todo) => todo.name.toLowerCase() === name.toLowerCase()
      )

      if (!existingUser) data.forEach((todo) => userIdSet.add(todo.userId))

      state.data = data.concat([
        {
          id: data.length >= 1 ? data[data.length - 1].id + 1 : 1,
          userId: existingUser
            ? existingUser.userId
            : Math.max(...userIdSet) + 1,
          name: existingUser ? existingUser.name : name,
          title: title,
          completed: false,
        },
      ])

      localStorage.setItem("crud-demo-data", JSON.stringify(state))
    },

    editItem: (state, action) => {
      const { itemIdToUpdate, title: newTitle } = action.payload

      state.data = state.data.map((item) => {
        if (itemIdToUpdate === item.id)
          return {
            ...item,
            title: newTitle,
          }
        return item
      })

      localStorage.setItem("crud-demo-data", JSON.stringify(state))
    },

    markItemAsComplete: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload)
          return {
            ...item,
            completed: !item.completed,
          }

        return item
      })

      localStorage.setItem("crud-demo-data", JSON.stringify(state))
    },

    markAllItemAsComplete: (state) => {
      const isAllCompleted = state.data.every((item) => item.completed === true)

      state.data = state.data.map((item) => ({
        ...item,
        completed: isAllCompleted ? false : true,
      }))

      localStorage.setItem("crud-demo-data", JSON.stringify(state))
    },
    deleteCompletedItem: (state) => {
      state.data = state.data.filter((item) => !item.completed)

      localStorage.setItem("crud-demo-data", JSON.stringify(state))
    },
  },
})

export default tableDataSlice.reducer
export const {
  setData,
  setErrorMessage,
  addItem,
  editItem,
  markItemAsComplete,
  markAllItemAsComplete,
  deleteCompletedItem,
} = tableDataSlice.actions
