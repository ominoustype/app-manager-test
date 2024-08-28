import ExpressServer from 'express'
import BodyParser from 'body-parser'

import loadDocuments from './documents/routes'
import errorHandler from './errorMiddleware'
import loadDeploymentConfigs from './deploymentConfigs/routes'
import loadEnvironments from './environments/routes'

const app = ExpressServer()
const port = process.env.PORT || 4000
const deployment = process.env.DEPLOYMENT_MESSAGE || "Local use"

app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

loadDocuments(app)
loadDeploymentConfigs(app)
loadEnvironments(app)

app.use(errorHandler)

app.get('/', (_req, res) => {
  res.send(title+art+deployment_text+footer)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const art:string  = `<pre>

                     __
                    / _)    Hello from App Manager!
           _.----._/ /
          /         /
       __/ (  | (  |
      /__.-'|_|--|_|
<pre>`;

const title:string = `<br><pre>
     _     ____   ____      __  __     _     _   _     _     ____  _____  ____  \r\n    \/ \\   |  _ \\ |  _ \\    |  \\\/  |   \/ \\   | \\ | |   \/ \\   \/ ___|| ____||  _ \\ \r\n   \/ _ \\  | |_) || |_) |   | |\\\/| |  \/ _ \\  |  \\| |  \/ _ \\ | |  _ |  _|  | |_) |\r\n  \/ ___ \\ |  __\/ |  __\/    | |  | | \/ ___ \\ | |\\  | \/ ___ \\| |_| || |___ |  _ < \r\n \/_\/   \\_\\|_|    |_|       |_|  |_|\/_\/   \\_\\|_| \\_|\/_\/   \\_\\\\____||_____||_| \\_\\\r\n                                                                                                                                                 
<pre>`

const deployment_text = `<br><br><i> (`+deployment+`)<i>`
const time = new Date();
const footer = `<br><br><small> Last reset: ` +time;