import axios from 'axios'

export default function getArchivesList () {
  const baseURL = axios.defaults.baseURL

  return axios({
    method: 'get',
    url: baseURL + 'article/archivesList'
  }).then((res) => {
    return res.data
  })
}
