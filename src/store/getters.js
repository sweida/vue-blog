const getters = {
  status: state => state.app.status,
  token: state => state.account.token, // token
  addRouters: state => state.permission.addRouters
}
export default getters
