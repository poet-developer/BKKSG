const id = process.env.NEXT_PUBLIC_REACT_APP_ADMIN_ID
const password = process.env.NEXT_PUBLIC_REACT_APP_ADMIN_PASSWORD
const users = [{ id: id, password: password }]

const Auth = ({ id, password }) => {
  const user = users.find(
    user => user.id === id && user.password === password
  );
  if (user === undefined) throw new Error()
  return user
}

export default Auth
