import axios from 'axios'

export default function getArticleList () {
  const baseURL = axios.defaults.baseURL

  return axios({
    method: 'get',
    url: baseURL + 'article/articleList'
  }).then((res) => {
    return res.data
  })
}
