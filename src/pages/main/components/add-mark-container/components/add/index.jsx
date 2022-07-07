import React from "react"
import Button from "@mui/material/Button"
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined"

const Add = () => {
  const addItem = () => {
    const dialog = document.getElementById("dialogModal")

    dialog.showModal()
  }

  return (
    <Button
      onClick={addItem}
      color="primary"
      variant="contained"
      startIcon={<AddCircleOutlinedIcon />}
    >
      Add Todo
    </Button>
  )
}

export default Add
