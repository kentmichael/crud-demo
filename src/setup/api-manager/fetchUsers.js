export const fetchUsers = () => {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      if (res.status !== 200) throw new Error(res.statusText)

      return res.json()
    })
    .then((data) => data)
    .catch((err) => err)
}
