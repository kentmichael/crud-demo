import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  setData,
  setErrorMessage,
  markItemAsComplete,
} from "@/setup/features/table-data/tableDataSlice"
import { setIdToUpdate } from "@/setup/features/update/updateSlice"
import Paper from "@mui/material/Paper"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import Typography from "@mui/material/Typography"
import TablePagination from "@mui/material/TablePagination"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined"

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

const setTableData = (state, dispatch) => {
  const { userData, todoData } = state
  const { todos, errorMessage: errorInTodosFetch } = todoData
  const { users, errorMessage: errorInUsersFetch } = userData

  const error = errorInTodosFetch || errorInUsersFetch

  if (error) {
    dispatch(setErrorMessage(error))
  } else if (todos.length && users.length) {
    const tableData = todos.map((todo) => {
      const user = users.find((user) => user.id === todo.userId)

      return {
        ...todo,
        name: user.name,
      }
    })
    dispatch(setData(tableData))
  }
}

const columns = [
  {
    id: "number",
    label: "No.",
    width: "5%",
  },
  {
    id: "user",
    label: "User",
    width: "20%",
  },
  {
    id: "todo",
    label: "Todo",
    width: "60%",
  },
  {
    id: "actions",
    label: "Actions",
    width: "15%",
  },
]

const TodoList = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { userData, todoData, tableData, filterAndSearch } = useSelector(
    (state) => state
  )
  const { loading, data, errorMessage } = tableData
  const { searchKeyword, filterOption } = filterAndSearch
  const dispatch = useDispatch()

  let list = filterList(data, filterOption)

  if (searchKeyword) list = searchList(list, searchKeyword)

  const updateItem = (id) => {
    const dialog = document.getElementById("dialogModal")

    dispatch(setIdToUpdate(id))
    dialog.showModal()
  }

  const completeItem = (id) => {
    dispatch(markItemAsComplete(id))
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value)
    setPage(0)
  }

  useEffect(() => {
    if (!localStorage.getItem("crud-demo-data")) {
      setTableData({ userData, todoData }, dispatch)
    }
  }, [userData, todoData])

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginBottom: "25px" }}>
      <TableContainer sx={{ height: 410 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  backgroundColor: "#dbdbdb",
                },
              }}
            >
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.width }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? null
              : errorMessage
              ? null
              : list.length
              ? list
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((todo, idx) => {
                    const { id, name, title, completed } = todo

                    return (
                      <TableRow key={id}>
                        <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>
                          {completed ? <strike>{title}</strike> : title}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => updateItem(id)}
                            disabled={completed ? true : false}
                            aria-label="Edit"
                            color="info"
                            title="Edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => completeItem(id)}
                            aria-label="Complete"
                            color={completed ? "success" : "error"}
                            title="Toggle Complete"
                          >
                            {completed ? (
                              <CheckCircleIcon />
                            ) : (
                              <RemoveCircleOutlinedIcon />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })
              : null}
          </TableBody>
        </Table>
        {loading ? (
          <Typography
            variant="h6"
            sx={{ marginTop: "20px", textAlign: "center" }}
          >
            Loading data..
          </Typography>
        ) : list.length ? null : errorMessage ? (
          <Typography
            variant="h6"
            sx={{ marginTop: "20px", textAlign: "center" }}
          >
            {errorMessage}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{ marginTop: "20px", textAlign: "center" }}
          >
            No Results.
          </Typography>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TodoList
