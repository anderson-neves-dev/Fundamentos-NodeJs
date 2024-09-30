
import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';


const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (requests, response) => {
            const users = database.select("Users")
            return response
                .setHeader('Content-type', 'aplication/json')
                .end(JSON.stringify(users))
        }
    }, {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (request, response) => {
            const { name, email } = request.body
            const user = {
                id: randomUUID(),
                name,
                email,
            }

            database.insert("Users", user)

            return response.writeHead(201).end()
        }
    }, {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (request, response) => {
            const { id } = request.params

            const { name, email } = req.body

            database.delete('Users', id)
            return response.writeHead(204)
        }
    }, {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (request, response) => {
            const { id } = request.params
            database.delete('Users', id)
            return response.writeHead(204)
        }
    }

]