import { Request, Response } from 'express'
import CreateUserCommand from '@context/users/application/create/createUserCommand'
import FindUserQuery from '@context/users/application/find/findUserQuery'
import SearchUsersQuery from '@context/users/application/search/searchUsersQuery'
import UpdateUserCommand from '@context/users/application/update/updateUserCommand'
import RemoveUserCommand from '@context/users/application/delete/removeUserCommand'

import { dependencies } from './application.di'
import DisableUserCommand from '@context/users/application/disable/disableUserCommand'
import ChangePasswordCommand from '@context/users/application/changePassword/changePasswordCommand'
import LogInUserQuery from '@context/users/application/login/loginUserQuery'
import LogoutUserCommand from '@context/users/application/logout/logoutUserCommand'
import RefreshTokenQuery from '@context/users/application/refreshToken/refreshTokenQuery'
import RefreshTokenResponse from '@context/users/application/refreshToken/refreshTokenResponse'
import InMemoryQueryBus from '@context/shared/infrastructure/queryBus/inMemoryQueryBus'
import FindRoleQuery from '@context/roles/application/find/findRoleQuery'
import InMemoryCommandBus from '@context/shared/infrastructure/commandBus/inMemoryCommandBus'
import RemoveRoleCommand from '@context/roles/application/delete/removeRoleCommand'


export async function searchUsers(req: Request, res: Response) {
    console.log('Request for searchUsers Triggered')

    const handler = dependencies.get('handlers').query.get(SearchUsersQuery);

    const result = await handler.handle(
        new SearchUsersQuery({
            ...req.query,
            page_size: req.query.page_size ? parseInt(req.query.page_size as string) : undefined,
            page: req.query.page ? parseInt(req.query.page as string) : undefined
        })
    );

    res.header("content-type", 'application/json')
    res.status(200).send({
        body:({
            result: result.primitives
        })
    })
}

export async function findUser(req: Request, res: Response) {
    console.log('Request for findUser Triggered')
    const { username } = req.params

    const handler = dependencies.get('handlers').query.get(FindUserQuery);

    console.log('Username to find', username)

    try {
        const response = await handler.handle(
            new FindUserQuery({ username })
        );

        res.header("content-type", 'application/json')
        res.status(200).send({ 
            body: response.primitives
        });
    } catch (e) {
        res.status(404).send({ error: e });
    }
}

export async function createUser(req: Request, res: Response) {
    console.log('Request for createUser Triggered')

    const queryBus = dependencies.get('buses').query.get(InMemoryQueryBus);
    const commandBus = dependencies.get('buses').command.get(InMemoryCommandBus);

    const roleFinder = dependencies.get('handlers').query.get(FindRoleQuery);
    queryBus.addHandlers(roleFinder);

    const roleRemover = dependencies.get('handlers').command.get(RemoveRoleCommand);
    commandBus.addHandlers(roleRemover);
    
    const handler = dependencies.get('handlers').command.get(CreateUserCommand);

    try {
        await handler.handle(new CreateUserCommand(req.body));

        res.status(201).send();
    } catch (e) {
        return e;
    }  
}

export async function updateUser(req: Request, res: Response) {
    console.log('Request for updateUser Triggered')

    const { username } = req.params

    const handler = dependencies.get('handlers').command.get(UpdateUserCommand);

    console.log('Username to update', username)

    try {
        await handler.handle(
            new UpdateUserCommand({
                username: username,
                ...req.body
            })
        );

        res.status(204).send()
    } catch (e) {
        return e;
    }
}

export async function deleteUser(req: Request, res: Response) {
    console.log('Request for deleteUser Triggered')
    const { username } = req.params

    const handler = dependencies.get('handlers').command.get(RemoveUserCommand);

    console.log('Username to delete', username)

    try {
        await handler.handle(
            new RemoveUserCommand({
                username: username
            })
        );

        res.status(204).send()
    } catch (e) {
        return e;
    }
}

export async function disableUser(req: Request, res: Response) {
    console.log('Request for disableUser Triggered')

    const { username } = req.params

    const handler = dependencies.get('handlers').command.get(DisableUserCommand);

    console.log('Username to disable', username)

    try {
        await handler.handle(
            new DisableUserCommand({
                username: username
            })
        );

        res.status(204).send()
    } catch (e) {
        return e;
    }
}

export async function changePassword(req: Request, res: Response) {
    console.log('Request for changePassword Triggered')

    const { username, oldPassword, newPassword } = req.body

    const handler = dependencies.get('handlers').command.get(ChangePasswordCommand);

    console.log('Username to change password', username)

    try {
        await handler.handle(
            new ChangePasswordCommand({
                username: username,
                oldPassword: oldPassword,
                newPassword: newPassword
            })
        );

        res.status(204).send()
    } catch (e) {
        return e;
    }
}

export async function logInUser(req: Request, res: Response) {
    console.log('Request for logInUser Triggered')
    const { username, password } = req.body

    const queryBus = dependencies.get('buses').query.get(InMemoryQueryBus);

    const roleFinder = dependencies.get('handlers').query.get(FindRoleQuery);
    queryBus.addHandlers(roleFinder);

    const handler = dependencies.get('handlers').query.get(LogInUserQuery);
    console.log('Username to login', username)

    try {
        const response = await handler.handle(
            new LogInUserQuery({ username, password })
        );

        res.header("content-type", 'application/json')
        res.status(200).send({
            body: { 
                accessToken: response.accessToken, 
                refreshToken: response.refreshToken 
            }
        });
    } catch (e) {
        res.status(404).send({ error: e });
    }
}

export async function logOutUser(req: Request, res: Response) {
    console.log('Request for logOutUser Triggered')

    const { username } = req.params

    const accessToken = req.header('Authorization')?.replace('Bearer ', '');
    const { refreshToken } = req.body;

    const handler = dependencies.get('handlers').command.get(LogoutUserCommand);

    console.log('Username to logout', username);

    try {
        await handler.handle(
            new LogoutUserCommand({
                username: username,
                accessToken: accessToken ? accessToken : "",
                refreshToken: refreshToken
            }));
        
        res.status(204).send()
    } 
    catch (e) {
        return e;
    }
}

export async function refreshToken(req: Request, res: Response) {
    console.log('Request for refreshToken Triggered');

    const { refreshToken } = req.body

    const queryBus = dependencies.get('buses').query.get(InMemoryQueryBus);

    const roleFinder = dependencies.get('handlers').query.get(FindRoleQuery);
    queryBus.addHandlers(roleFinder);
    
    const handler = dependencies.get('handlers').query.get(RefreshTokenQuery);

    console.log('Refresh token to be used', refreshToken);

    try{
        const response = await handler.handle(new RefreshTokenQuery({
            refreshToken: refreshToken
        })) as RefreshTokenResponse;

        res.status(200).send({
            accessToken: response.accessToken
        });
    }
    catch(e) {
        res.status(500).send({ error: e });
    }
}