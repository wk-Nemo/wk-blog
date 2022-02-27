import axios from 'axios'

export default function getArticleListByCategory (category) {
  const baseURL = axios.defaults.baseURL

  return axios({
    method: 'get',
    url: baseURL + `category/${category}`
  }).then((res) => {
    return res.data
  })
}
