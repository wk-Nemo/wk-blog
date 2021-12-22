import axios from 'axios'

export default function getArticles () {
  return axios({
    method: 'get',
    url: 'http://localhost:8081/articles'
  }).then((res) => {
    return res.data
  })
}
