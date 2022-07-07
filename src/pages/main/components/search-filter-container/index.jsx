import React from "react"
import Box from "@mui/material/Box"
import { useTheme } from "@mui/material"
import Search from "./components/search"
import Filter from "./components/filter"

const SearchAndFilterContainer = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        marginBottom: "25px",

        [theme.breakpoints.up("md")]: {
          gap: 0,
        },
      }}
    >
      <Search />
      <Filter />
    </Box>
  )
}

export default SearchAndFilterContainer
