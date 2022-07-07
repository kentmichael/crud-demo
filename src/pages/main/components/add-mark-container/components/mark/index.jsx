import React, { useContext, useMemo } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
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
    <Box>
      <Button onClick={completeAllItem} color="warning" variant="outlined">
        Mark all as complete
      </Button>
      {checkCompletedItem ? (
        <Button onClick={deleteCompletedItem} color="error" variant="outlined">
          Delete completed items
        </Button>
      ) : null}
    </Box>
  )
}

export default Mark
