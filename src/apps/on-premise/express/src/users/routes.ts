import { Express } from 'express'

import { searchUsers, findUser, createUser, updateUser, deleteUser, 
    changePassword, disableUser, logInUser, logOutUser, refreshToken } from './controllers'


export default function loadUsers(app: Express) {
    app.get('/users', searchUsers)
    app.get('/users/:username', findUser)
    app.post('/users', createUser)
    app.put('/users/:username', updateUser)
    app.put('/users/:username/disable', disableUser)
    app.delete('/users/:username', deleteUser)
    app.post('/change', changePassword)
    app.post('/login', logInUser)
    app.post('/logout', logOutUser)
    app.post('/refreshToken', refreshToken)
}