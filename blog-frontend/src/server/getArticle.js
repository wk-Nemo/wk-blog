import axios from 'axios'

export default function getArticle (id) {
  const baseURL = axios.defaults.baseURL

  return axios({
    method: 'get',
    url: baseURL + `article/${id}`
  }).then((res) => {
    return res.data
  })
}
