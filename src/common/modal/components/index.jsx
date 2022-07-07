import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useSelector, useDispatch } from "react-redux"
import { setIdToUpdate } from "@/setup/features/update/updateSlice"
import { addItem, editItem } from "@/setup/features/table-data/tableDataSlice"

const modalStyle = {
  padding: 0,
  borderColor: "#fff",
  borderRadius: "5px",
}

const initialState = {
  name: "",
  item: "",
}

const DialogModal = () => {
  const [input, setInput] = useState(initialState)
  const dispatch = useDispatch()
  const {
    tableData: { data: todoList },
    idToUpdate: { id: itemIdToUpdate },
  } = useSelector((state) => state)

  const handleSubmit = (e) => {
    const dialog = document.getElementById("dialogModal")

    if (input.name && input.item) {
      const { name, item: title } = input

      itemIdToUpdate
        ? dispatch(editItem({ itemIdToUpdate, title }))
        : dispatch(addItem({ name, title }))

      setInput(initialState)
      dispatch(setIdToUpdate(0))
      dialog.close()
    }

    e.preventDefault()
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const closeModal = () => {
    const dialog = document.getElementById("dialogModal")

    setInput(initialState)
    dispatch(setIdToUpdate(0))
    dialog.close()
  }

  useEffect(() => {
    if (itemIdToUpdate) {
      const item = todoList.find((todo) => todo.id === itemIdToUpdate)

      setInput({
        name: item.name,
        item: item.title,
      })
    }
  }, [itemIdToUpdate])

  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        closeModal()
      }
    })
  }, [])

  return ReactDOM.createPortal(
    <dialog
      id="dialogModal"
      onClick={(e) => {
        if (e.target.id === "dialogModal") {
          closeModal()
        }
      }}
      style={modalStyle}
    >
      <Box
        sx={{
          width: 360,
          paddingBlock: "20px",
          paddingInline: "10px",
        }}
      >
        <FormControl
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexFlow: "column wrap",
            gap: "15px",
          }}
        >
          <Typography variant="h1" sx={{ fontSize: "28px" }}>
            {itemIdToUpdate ? "EDIT" : "ADD"}
          </Typography>

          <TextField
            variant="outlined"
            type="text"
            label="Name"
            name="name"
            value={input.name}
            onChange={handleChange}
            disabled={itemIdToUpdate ? true : false}
            required
          />

          <TextField
            id="outlined-multiline-static"
            label="Item"
            type="text"
            name="item"
            value={input.item}
            onChange={handleChange}
            multiline
            rows={5}
            required
          />

          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Confirm
            </Button>
            <Button onClick={closeModal} variant="contained" color="error">
              Cancel
            </Button>
          </Stack>
        </FormControl>
      </Box>
    </dialog>,
    document.getElementById("root-modal")
  )
}

export default DialogModal
