import axios from 'axios'

export default function getFriendLink () {
  const baseURL = axios.defaults.baseURL

  return axios({
    method: 'get',
    url: baseURL + 'friend/友链'
  }).then((res) => {
    return res.data
  })
}
