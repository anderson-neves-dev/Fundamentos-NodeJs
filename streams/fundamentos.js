// process.stdin
//     .pipe(process.stdout)

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));

                this.push(buf);
            }
        }, 1000);
    }
}

class InverseNumberStream extends Transform {
    _transform(chuck, encoding, callback) {
        const trasformed = Number(chuck.toString()) * -1

        callback(null, Buffer.from(String(trasformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chuck, encoding, callback) {
        console.log(Number(chuck.toString()) * 10);
        callback();
    }
}
const geraNumeros = new OneToHundredStream()
const recebeEEscreveNumeros = new MultiplyByTenStream();
const transformaNumeros = new InverseNumberStream()

geraNumeros.pipe(transformaNumeros);
transformaNumeros.pipe(recebeEEscreveNumeros)