module.exports = app => {
  app.locals.title = 'SENSASINEMA'
  app.locals.Api = process.env.APIMAPS
  app.locals.movieAPI = process.env.movieAPI



}