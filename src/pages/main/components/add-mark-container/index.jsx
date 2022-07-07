import React from "react"
import Stack from "@mui/material/Stack"
import Mark from "./components/mark"
import Add from "./components/add"

const AddMarkContainer = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Mark />
      <Add />
    </Stack>
  )
}

export default AddMarkContainer
