import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from './config'

const ApiService = {
  init() {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },
  search (term) {
     return Vue.axios
       .get('search/' + term)
       .catch((error) => {
          throw new Error(`ApiService search ${error}`)
        })
  },
  feed(country, id) {
    // .get('lookup', { params: { country: country, id: id}} )
    return Vue.axios
      .get('/podcast/' + country + '/' + id )
      .catch((error) => {
        throw  new Error(`ApiService lookup ${error}`)
      })
  },
  register(user){
    console.log(JSON.stringify(user))
    return Vue.axios
      .post('/user/', JSON.stringify(user),
        {
          headers: {
            'Content-type': 'application/json',
          }
        })
      .catch(error => {
        throw new Error(`${error.response.data.error}`);
      });
  }
}
export default ApiService
