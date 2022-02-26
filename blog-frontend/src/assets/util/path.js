let baseUrl = 'http://47.103.200.75:81/'

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://localhost:3000/'
    break

  case 'production':
    baseUrl = 'http://47.103.200.75:81/'
    break
}

export default baseUrl
