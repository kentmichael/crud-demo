import React, { useContext, useState, useTransition } from "react"
import { AppContext } from "@/setup/app-context-manager/appContext"

const Search = () => {
  const [isPending, startTransition] = useTransition()
  const [input, setInput] = useState("")
  const { dispatchFilter } = useContext(AppContext)

  const handleInputChange = (e) => {
    setInput(e.target.value)

    startTransition(() => {
      dispatchFilter({ type: "SEARCH_KEYWORD", payload: e.target.value })
    })
  }

  return (
    <input
      type="search"
      value={input}
      onChange={handleInputChange}
      placeholder="Search item..."
    />
  )
}

export default Search
