import axios from 'axios'

export default function getFriendLink () {
  const baseURL = axios.defaults.baseURL

  return axios({
    method: 'get',
    url: baseURL + 'article/friendLink'
  }).then((res) => {
    return res.data
  })
}
