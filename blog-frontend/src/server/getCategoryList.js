import axios from 'axios'

export default function getCategoryList () {
  const baseURL = axios.defaults.baseURL

  return axios({
    method: 'get',
    url: baseURL + 'category/categoryList'
  }).then((res) => {
    return res.data
  })
}
