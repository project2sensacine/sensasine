module.exports = app => {
  app.locals.titulo = 'SENSASINEMA'
  app.locals.Api = process.env.APIMAPS
  app.locals.movieAPI = process.env.movieAPI

}