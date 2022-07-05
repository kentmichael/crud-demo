import React, { useState, useContext, useEffect } from "react"
import ReactDOM from "react-dom"
import { AppContext } from "@/setup/app-context-manager/appContext"

const initialState = {
  name: "",
  item: "",
}

const DialogModal = () => {
  const [input, setInput] = useState(initialState)
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
        console.log("asdasdqwe")
      }
    })
  }, [])

  return ReactDOM.createPortal(
    <dialog id="dialogModal">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange}
          disabled={itemIdToUpdate ? true : false}
        />
        <br />

        <label>Item:</label>
        <input
          type="text"
          name="item"
          value={input.item}
          onChange={handleChange}
        />

        <div>
          <button type="submit">Confirm</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </dialog>,
    document.getElementById("root-modal")
  )
}

export default DialogModal
