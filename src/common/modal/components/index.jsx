import React, { useState, useContext, useEffect } from "react"
import ReactDOM from "react-dom"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { AppContext } from "@/setup/app-context-manager/appContext"

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
  const [confirm, setConfirm] = useState(false)
  const dialog = document.getElementById("dialogModal")

  const {
    state: { todoList },
    dispatch,
    itemIdToUpdate,
    setItemIdToUpdate,
  } = useContext(AppContext)

  const handleSubmit = (e) => {
    if (input.name && input.item) {
      const { name, item: title } = input

      itemIdToUpdate
        ? dispatch({
            type: "UPDATE_ITEM",
            payload: { itemIdToUpdate, title },
          })
        : dispatch({ type: "ADD_ITEM", payload: { name, title } })

      setInput(initialState)
      setItemIdToUpdate("")
      dialog.close()
    }

    setConfirm(true)
    e.preventDefault()
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const closeModal = () => {
    setInput(initialState)
    setItemIdToUpdate("")
    setConfirm(false)
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
        setInput(initialState)
        setItemIdToUpdate("")
      }
    })
  }, [])

  return ReactDOM.createPortal(
    <dialog
      id="dialogModal"
      onClick={(e) => {
        if (e.target.id === "dialogModal") {
          setInput(initialState)
          setItemIdToUpdate("")
          setConfirm(false)
          dialog.close()
        }
      }}
      style={modalStyle}
    >
      <Box
        sx={{
          width: 360,
          height: 410,
          paddingBlock: "20px",
          paddingInline: "10px",
        }}
      >
        <FormControl
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
            {input.name ? "EDIT" : "ADD"}
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
