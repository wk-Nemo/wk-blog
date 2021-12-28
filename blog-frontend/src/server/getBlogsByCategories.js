import axios from 'axios'

export default function getBlogsByCategories (category) {
  const baseURL = axios.defaults.baseURL

  return axios({
    method: 'get',
    url: baseURL + `categoriesBlog/${category}`
  }).then((res) => {
    return res.data
  })
}
