module.exports = {
  reactStrictMode: true,
  async redirects(){
    return [
      {
        source : "/signup",
        destination : "/",
        permanent : true
      }
    ]
  }
}
