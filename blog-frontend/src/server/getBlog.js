import axios from 'axios'

export default function getBlog (id) {
  const baseURL = axios.defaults.baseURL

  return axios({
    method: 'get',
    url: baseURL + `blog/${id}`
  }).then((res) => {
    return res.data
  })
}
