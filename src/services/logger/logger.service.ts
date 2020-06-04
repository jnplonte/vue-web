export class Logger {
    env: string = process.env.NODE_ENV;

    table(...msg: any) {
        if (this.env !== 'production') {
            console.table(...msg);
        }
    }

    info(...msg: any) {
        if (this.env !== 'production') {
            console.log(...msg);
        }
    }

    warn(...msg: any) {
        if (this.env !== 'production') {
            console.warn(...msg);
        }
    }

    error(...msg: any) {
        if (this.env !== 'production') {
            console.error(...msg);
        }
    }
}
