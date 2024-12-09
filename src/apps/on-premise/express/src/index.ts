import ExpressServer from 'express'
//import GuardFactory from 'express-jwt-permissions'

import loadDocuments from './documents/routes'
import errorHandler from './middleware/error'
import loadDeploymentConfigs from './deploymentConfigs/routes'
import loadEnvironments from './environments/routes'
import loadRoles from './roles/routes'
import loadUsers from './users/routes'

const app = ExpressServer()

const port = process.env.PORT || 3333
const deployment = process.env.DEPLOYMENT_MESSAGE || "Local use"
/*
const guard = GuardFactory({
  requestProperty: 'payload',
  permissionsProperty: 'permissions'
})
  */

app.use(ExpressServer.json())
app.use(ExpressServer.urlencoded({ extended: true }))

loadDocuments(app)
loadDeploymentConfigs(app)
loadEnvironments(app)
loadRoles(app)
loadUsers(app)

app.use(errorHandler)

/*
redisClient.on('connect', () => {
  console.log(`Redis listening at ${redisHost}:${redisPort}`)
})

redisClient.on('error', (error) => {
  console.log(error)
})
*/

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
