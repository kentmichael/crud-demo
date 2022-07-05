import React, { useContext } from "react"
import { AppContext } from "@/setup/app-context-manager/appContext"

const Filter = () => {
  const { stateFilter, dispatchFilter } = useContext(AppContext)

  const handleOptionChange = (e) => {
    dispatchFilter({ type: "FILTER_OPTION", payload: e.target.value })
  }

  return (
    <select value={stateFilter.filterOption} onChange={handleOptionChange}>
      <option value="All">All</option>
      <option value="Active">Active</option>
      <option value="Completed">Completed</option>
    </select>
  )
}

export default Filter
