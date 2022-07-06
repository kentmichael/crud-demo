import React from "react"

const Add = () => {
  const addItem = () => {
    const dialog = document.getElementById("dialogModal")
    dialog.showModal()
  }

  return <button onClick={addItem}>+</button>
}

export default Add
