import ExpressServer from 'express'

import loadDocuments from './documents/routes'
import errorHandler from './errorMiddleware'

const app = ExpressServer()
const port = 3000

loadDocuments(app)

app.use(errorHandler)

app.get('/', (_req, res) => {
  res.send("Hello From Express and Typescript")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})