import React, { useEffect, useContext } from "react"
import { fetchData } from "@/setup/api-manager/fetchData"
import { AppContext } from "@/setup/app-context-manager/appContext"

const filterList = (todoList, option) => {
  return option === "Active"
    ? todoList.filter((item) => item.completed === false)
    : option === "Completed"
    ? todoList.filter((item) => item.completed === true)
    : todoList
}

const searchList = (list, keyword) =>
  list.filter((item) =>
    item.title.toLowerCase().includes(keyword.toLowerCase())
  )

const TodoList = () => {
  const {
    state: { isLoading, todoList, errorMessage },
    dispatch,
    stateFilter: { searchKeyword, filterOption },
    setItemIdToUpdate,
  } = useContext(AppContext)

  let list = filterList(todoList, filterOption)

  if (searchKeyword) list = searchList(list, searchKeyword)

  const updateItem = (id) => {
    const dialog = document.getElementById("dialogModal")

    setItemIdToUpdate(id)
    dialog.showModal()
  }

  const completeItem = (id) => {
    dispatch({ type: "COMPLETE_ITEM", payload: id })
  }

  useEffect(() => {
    const storage = localStorage.getItem("CRUD_demo")

    console.log(storage)

    if (!storage)
      fetchData()
        .then((res) => {
          if (res instanceof Error) throw new Error(res.message)
          dispatch({ type: "FETCH_SUCCESS", payload: res })
        })
        .catch((err) => dispatch({ type: "FETCH_ERROR", payload: err.message }))
    else {
      const state = JSON.parse(storage)
      dispatch({ type: "FETCH_SUCCESS", payload: state.todoList })
    }
  }, [])

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Item</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? null
            : errorMessage
            ? null
            : list.length
            ? list.map((todo, idx) => {
                const { id, name, title, completed } = todo

                return (
                  <tr key={id}>
                    <td>{idx + 1}</td>
                    <td>{name}</td>
                    <td>{completed ? <strike>{title}</strike> : title}</td>
                    <td>
                      <button
                        onClick={() => updateItem(id)}
                        disabled={completed ? true : false}
                      >
                        Edit
                      </button>
                      <button onClick={() => completeItem(id)}>Complete</button>
                    </td>
                  </tr>
                )
              })
            : null}
        </tbody>
      </table>
      {isLoading ? (
        <h3>Loading data..</h3>
      ) : list.length ? null : errorMessage ? (
        <h3>{errorMessage}</h3>
      ) : (
        <h3>No Results.</h3>
      )}
    </>
  )
}

export default TodoList
