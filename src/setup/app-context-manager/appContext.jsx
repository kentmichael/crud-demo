import React, { useReducer, useState } from "react"

export const AppContext = React.createContext()

const initialState = {
  isLoading: true,
  todoList: [],
  errorMessage: "",
}

const reducer = (currentState, action) => {
  let newState = {}

  switch (action.type) {
    case "FETCH_SUCCESS":
      newState = {
        ...currentState,
        isLoading: false,
        todoList: action.payload,
        errorMessage: "",
      }
      break

    case "FETCH_ERROR":
      newState = {
        ...currentState,
        isLoading: false,
        todoList: [],
        errorMessage: action.payload,
      }
      break

    case "ADD_ITEM":
      const { name, title } = action.payload
      const { todoList } = currentState

      newState = {
        ...currentState,
        todoList: todoList.concat([
          {
            id: todoList.length >= 1 ? todoList[todoList.length - 1].id + 1 : 1,
            userId: 1000,
            name: name,
            title: title,
            completed: false,
          },
        ]),
      }
      break

    case "UPDATE_ITEM":
      const { itemIdToUpdate, title: newTitle } = action.payload

      newState = {
        ...currentState,
        todoList: currentState.todoList.map((item) => {
          if (itemIdToUpdate === item.id)
            return {
              ...item,
              title: newTitle,
            }
          return item
        }),
      }
      break

    case "COMPLETE_ITEM":
      newState = {
        ...currentState,
        todoList: currentState.todoList.map((item) => {
          if (item.id === action.payload)
            return {
              ...item,
              completed: !item.completed,
            }

          return item
        }),
      }
      break

    case "COMPLETE_ALL_ITEM":
      const isAllCompleted = currentState.todoList.every(
        (item) => item.completed === true
      )

      newState = {
        ...currentState,
        todoList: currentState.todoList.map((item) => ({
          ...item,
          completed: isAllCompleted ? false : true,
        })),
      }
      break

    case "DELETE_COMPLETED":
      newState = {
        ...currentState,
        todoList: currentState.todoList.filter((item) => !item.completed),
      }
      break

    default:
      newState = currentState
      break
  }

  localStorage.setItem("CRUD_demo", JSON.stringify(newState))
  return newState
}

const initialStateFilter = {
  searchKeyword: "",
  filterOption: "All",
}

const filterReducer = (currentState, action) => {
  switch (action.type) {
    case "SEARCH_KEYWORD":
      return {
        ...currentState,
        searchKeyword: action.payload,
      }
    case "FILTER_OPTION":
      return {
        ...currentState,
        filterOption: action.payload,
      }
    default:
      return currentState
  }
}

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [stateFilter, dispatchFilter] = useReducer(
    filterReducer,
    initialStateFilter
  )
  const [itemIdToUpdate, setItemIdToUpdate] = useState("")

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        stateFilter,
        dispatchFilter,
        itemIdToUpdate,
        setItemIdToUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
