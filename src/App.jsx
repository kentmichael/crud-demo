import React from "react"
import SearchAndFilterContainer from "./pages/main/components/search-filter-container"
import TodoList from "./pages/main/components/todo-list"

const App = () => {
  return (
    <>
      <h1>CRUD Demo</h1>
      <SearchAndFilterContainer />
      <TodoList />
    </>
  )
}

export default App
