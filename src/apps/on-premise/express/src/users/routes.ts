import { Express } from 'express';

import { searchUsers, findUser, createUser, updateUser, deleteUser, 
    changePassword, disableUser, logInUser, logOutUser, refreshToken } from './controllers';
    
import { auth } from '../middleware/auths';

export default function loadUsers(app: Express) {
    app.get('/users', auth, searchUsers);
    app.get('/users/:username', auth, findUser);
    app.post('/users', auth, createUser);
    app.put('/users/:username', auth, updateUser);
    app.put('/users/:username/disable', auth, disableUser);
    app.delete('/users/:username', auth, deleteUser);
//
    app.post('/change', changePassword);
    app.post('/login', logInUser);
    app.post('/logout/:username', logOutUser);
    app.post('/refreshToken', refreshToken);
}