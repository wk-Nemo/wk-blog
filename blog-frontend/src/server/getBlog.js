import axios from 'axios'

export default function getBlog (id) {
  return axios({
    method: 'get',
    url: `http://localhost:8081/blog/${id}`
  }).then((res) => {
    return res.data
  })
}
