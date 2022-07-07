import React, { useEffect } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import AddMarkContainer from "./pages/main/components/add-mark-container"
import SearchAndFilterContainer from "./pages/main/components/search-filter-container"
import TodoList from "./pages/main/components/todo-list-table"
import DialogModal from "./common/modal/components"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useDispatch } from "react-redux"
import { fetchTodos } from "./setup/features/todos/todosSlice"
import { fetchUsers } from "./setup/features/users/usersSlice"

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          padding: 0,
          backgroundColor: "#0a1929",
          color: "#fff",
        },
      },
    },
  },
})

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!localStorage.getItem("crud-demo-data")) {
      dispatch(fetchTodos())
      dispatch(fetchUsers())
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth="lg"
          sx={{
            paddingInline: "40px",
            paddingBottom: "60px",
            [theme.breakpoints.up("lg")]: {
              marginInline: "auto",
              paddingBottom: "30px",
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              paddingBlock: "60px",
              fontSize: "32px",
              fontWeight: "600",
              [theme.breakpoints.up("md")]: {
                paddingBlock: "30px",
              },
            }}
          >
            basic crud
          </Typography>
          <SearchAndFilterContainer />
          <TodoList />
          <AddMarkContainer />
          <DialogModal />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
