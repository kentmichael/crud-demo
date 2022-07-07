import React, { useMemo } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useDispatch, useSelector } from "react-redux"
import {
  markAllItemAsComplete,
  deleteCompletedItem,
} from "@/setup/features/table-data/tableDataSlice"

const Mark = () => {
  const {
    tableData: { data: todoList },
  } = useSelector((state) => state)
  const dispatch = useDispatch()

  const completeAllItem = () => {
    dispatch(markAllItemAsComplete())
  }

  const checkCompletedItem = useMemo(() => {
    if (Array.isArray(todoList))
      return todoList.some((item) => item.completed === true)
  }, [todoList])

  const deleteAllCompletedItem = () => {
    dispatch(deleteCompletedItem())
  }

  return (
    <Box>
      <Button onClick={completeAllItem} color="warning" variant="outlined">
        Mark all as complete
      </Button>
      {checkCompletedItem ? (
        <Button
          onClick={deleteAllCompletedItem}
          color="error"
          variant="outlined"
        >
          Delete completed items
        </Button>
      ) : null}
    </Box>
  )
}

export default Mark
