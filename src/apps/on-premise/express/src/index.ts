import ExpressServer from 'express'
//import GuardFactory from 'express-jwt-permissions'

import loadDocuments from './documents/routes'
import errorHandler from './middleware/error'
import loadDeploymentConfigs from './deploymentConfigs/routes'
import loadEnvironments from './environments/routes'
import loadRoles from './roles/routes'
import loadUsers from './users/routes'
import loadCustomers from './customers/routes'
import logger from '@context/shared/infrastructure/logger'

const app = ExpressServer()
const PORT = process.env.PORT || 4000
let PORT_CONTAINER = process.env.PORT_CONTAINER || 3000
const deployment = process.env.DEPLOYMENT_MESSAGE || "Local use"
/*
const guard = GuardFactory({
  requestProperty: 'payload',
  permissionsProperty: 'permissions'
})
  */

if(PORT == 4000)
  PORT_CONTAINER = PORT;

app.use(ExpressServer.json())
app.use(ExpressServer.urlencoded({ extended: true }))

loadDocuments(app)
loadDeploymentConfigs(app)
loadEnvironments(app)
loadRoles(app)
loadCustomers(app)
loadUsers(app)

app.use(errorHandler)

app.get('/', (_req, res) => {
  res.send(title+art+deployment_text+footer)
})

app.listen(PORT_CONTAINER, () => {
  logger.info(`Example app listening at http://localhost:${PORT}`)
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
