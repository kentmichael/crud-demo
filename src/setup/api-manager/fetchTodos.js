export const fetchTodos = () => {
  return fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => {
      if (res.status !== 200) throw new Error(res.statusText)

      return res.json()
    })
    .then((data) => data)
    .catch((err) => err)
}
