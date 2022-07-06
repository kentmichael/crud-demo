import React from "react"
import AddMarkContainer from "./pages/main/components/add-mark-container"
import SearchAndFilterContainer from "./pages/main/components/search-filter-container"
import TodoList from "./pages/main/components/todo-list-table"
import AppContextProvider from "./setup/app-context-manager/appContext"
import DialogModal from "./common/modal/components"

const App = () => {
  return (
    <>
      <AppContextProvider>
        <h1>CRUD Demo</h1>
        <SearchAndFilterContainer />
        <TodoList />
        <AddMarkContainer />
        <DialogModal />
      </AppContextProvider>
    </>
  )
}

export default App
