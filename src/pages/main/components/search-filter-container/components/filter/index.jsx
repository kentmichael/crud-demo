import React from "react"
import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import { useDispatch, useSelector } from "react-redux"
import { setFilterOption } from "@/setup/features/filter-and-search/filterAndSearchSlice"

const Filter = () => {
  const { filterAndSearch } = useSelector((state) => state)
  const { filterOption } = filterAndSearch
  const dispatch = useDispatch()

  const handleOptionChange = (e) => {
    dispatch(setFilterOption(e.target.value))
  }

  return (
    <FormControl
      sx={{
        width: "200px",
        "& .MuiOutlinedInput-root": {
          "& > fieldset": {
            borderColor: "#6c6c6c",
          },
        },
        "& .MuiSvgIcon-root": {
          color: "#fff",
        },
        "& .MuiOutlinedInput-root:hover": {
          "& > fieldset": {
            borderColor: "#fff",
          },
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        },
      }}
    >
      <InputLabel
        id="filter"
        sx={{
          color: "#fff",
        }}
      >
        Filter
      </InputLabel>
      <Select
        labelId="filter"
        label="filter"
        value={filterOption}
        onChange={handleOptionChange}
        sx={{
          "& .MuiSelect-outlined": {
            color: "#fff",
          },
        }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </Select>
    </FormControl>
  )
}

export default Filter
