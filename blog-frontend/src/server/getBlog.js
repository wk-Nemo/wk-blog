import axios from 'axios'
import { ONLINE } from './path'

export default function getBlog (id) {
  return axios({
    method: 'get',
    url: ONLINE + `blog/${id}`
  }).then((res) => {
    return res.data
  })
}
