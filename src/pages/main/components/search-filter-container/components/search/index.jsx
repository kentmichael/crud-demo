import React, { useContext, useState, useTransition } from "react"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { AppContext } from "@/setup/app-context-manager/appContext"
import { InputAdornment } from "@mui/material"
import { useTheme } from "@mui/material"

const Search = () => {
  const [isPending, startTransition] = useTransition()
  const [input, setInput] = useState("")
  const { dispatchFilter } = useContext(AppContext)
  const theme = useTheme()

  const handleInputChange = (e) => {
    setInput(e.target.value)

    startTransition(() => {
      dispatchFilter({ type: "SEARCH_KEYWORD", payload: e.target.value })
    })
  }

  return (
    <TextField
      type="search"
      value={input}
      onChange={handleInputChange}
      aria-label="Search item"
      label="Search field"
      id="outlined-basic"
      variant="outlined"
      sx={{
        borderColor: "#fff",
        input: {
          color: "#fff",
        },
        "& .MuiInputLabel-root": {
          color: "#fff",
        },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": {
            borderColor: "#6c6c6c",
          },
        },
        "& .MuiOutlinedInput-root:hover": {
          "& > fieldset": {
            borderColor: "#fff",
            "& > legend": {
              color: "red",
            },
          },
        },
        [theme.breakpoints.up("md")]: {
          width: "500px",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              sx={{
                color: "#fff",
              }}
            />
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  )
}

export default Search
