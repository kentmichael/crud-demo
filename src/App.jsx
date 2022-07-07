import React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import AddMarkContainer from "./pages/main/components/add-mark-container"
import SearchAndFilterContainer from "./pages/main/components/search-filter-container"
import TodoList from "./pages/main/components/todo-list-table"
import AppContextProvider from "./setup/app-context-manager/appContext"
import DialogModal from "./common/modal/components"
import { createTheme, ThemeProvider } from "@mui/material/styles"

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
  return (
    <>
      <AppContextProvider>
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
      </AppContextProvider>
    </>
  )
}

export default App
