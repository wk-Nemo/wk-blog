import axios from 'axios'
import { ONLINE } from './path'

export default function getArticles () {
  return axios({
    method: 'get',
    url: ONLINE + 'articles'
  }).then((res) => {
    return res.data
  })
}
