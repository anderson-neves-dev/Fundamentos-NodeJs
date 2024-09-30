import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        try {
            const transformed = Number(chunk.toString()) * -1;
            console.log(transformed);
            callback(null, Buffer.from(String(transformed)));
        } catch (error) {
            console.error('Error during transformation:', error);
            callback(error);
        }
    }
}

const server = http.createServer(async (req, res) => {
    try {
        const buffer = [];

        // Process stream from the request
        for await (const chunk of req) {
            buffer.push(chunk);
        }

        const fullStreamContent = Buffer.concat(buffer).toString();

        console.log(fullStreamContent);

        res.end(fullStreamContent);
    } catch (error) {
        console.error('Error processing request:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
});

// Envolver a criação do servidor em um try-catch para detectar erros no `listen`
try {
    server.listen(3334, () => {
        console.log('Server is running on http://127.0.0.1:3334');
    });
} catch (error) {
    console.error('Error starting server:', error);
}
