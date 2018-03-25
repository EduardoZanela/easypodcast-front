import Vue from 'vue'

const UserService = {
  register(user){
    console.log(JSON.stringify(user))
    return Vue.axios
      .post('/user/', JSON.stringify(user),
        {
          headers: {
            'Content-type': 'application/json'
          }
        })
      .catch(error => {
        throw new Error(`${error.response.data.error}`);
      });
  },
  signin(user){
    return Vue.axios
      .post('/user/login', JSON.stringify(user),
        {
          headers: {
            'Content-type': 'application/json'
          }
        })
      .catch((error => {
        throw new Error(`${error.response.data.error}`);
      }));
  }
}
export default UserService
