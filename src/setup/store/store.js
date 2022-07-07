import { configureStore } from "@reduxjs/toolkit"
import UserReducer from "@/setup/features/users/usersSlice"
import TodoReducer from "@/setup/features/todos/todosSlice"
import TableDataReducer from "@/setup/features/table-data/tableDataSlice"
import ItemToUpdateReducer from "@/setup/features/update/updateSlice"
import FilterAndSearchReducer from "@/setup/features/filter-and-search/filterAndSearchSlice"

const store = configureStore({
  reducer: {
    userData: UserReducer,
    todoData: TodoReducer,
    tableData: TableDataReducer,
    idToUpdate: ItemToUpdateReducer,
    filterAndSearch: FilterAndSearchReducer,
  },
})

export default store
