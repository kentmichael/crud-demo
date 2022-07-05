import React, { useContext, useMemo } from "react"
import { AppContext } from "@/setup/app-context-manager/appContext"

const Mark = () => {
  const {
    state: { todoList },
    dispatch,
  } = useContext(AppContext)

  const completeAllItem = () => {
    dispatch({ type: "COMPLETE_ALL_ITEM" })
  }

  const checkCompletedItem = useMemo(() => {
    if (Array.isArray(todoList))
      return todoList.some((item) => item.completed === true)
  }, [todoList])

  const deleteCompletedItem = () => {
    dispatch({ type: "DELETE_COMPLETED" })
  }

  return (
    <>
      <button onClick={completeAllItem}>Mark all as complete</button>
      {checkCompletedItem ? (
        <button onClick={deleteCompletedItem}>Delete completed items</button>
      ) : null}
    </>
  )
}

export default Mark
