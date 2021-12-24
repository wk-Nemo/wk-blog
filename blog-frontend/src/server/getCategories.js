import axios from 'axios'
import { ONLINE } from './path'

export default function getArticles () {
  return axios({
    method: 'get',
    url: ONLINE + 'categories'
  }).then((res) => {
    return res.data
  })
}
