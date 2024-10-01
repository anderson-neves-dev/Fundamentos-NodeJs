
import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';


const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (requests, response) => {
            const { seach } = requests.query
            const users = database.select("Users", seach ? {
                name: seach,
                email: seach,
            } : null)
            return response
                .setHeader('Content-type', 'application/json')
                .end(JSON.stringify(users))
        }
    }, {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (request, response) => {
            const { name, email } = request.body
            console.log(name)
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


            database.delete('Users', id)
            return response.writeHead(204).end();
        }
    }, {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (request, response) => {
            const { id } = request.params

            const { name, email } = request.body

            database.update('Users', id, {
                name, email,
            })
            console.log("Deu certo")
            return response.writeHead(204).end();
        }
    }

]