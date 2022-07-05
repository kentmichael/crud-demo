import { fetchUsers } from "./fetchUsers"
import { fetchTodos } from "./fetchTodos"

const createTableData = (data) => {
  const [users, todos] = data

  return todos.map((item) => {
    const user = users.find((user) => user.id === item.userId)

    return {
      ...item,
      name: user.name,
    }
  })
}

export async function fetchData() {
  const users = fetchUsers()
  const todos = fetchTodos()
  const results = await Promise.all([users, todos])
  const hasError = results.find((result) => result instanceof Error)

  return hasError ? hasError : createTableData(results)
}
