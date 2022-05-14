import Winston from 'winston';
import LokiTransport from 'winston-loki';

class Logger {
    constructor() {
        return Winston.createLogger({
            defaultMeta: { service: 'farodyne-backend' },
            transports: [
                new Winston.transports.Console({
                    format: Winston.format.json()
                }),
                new LokiTransport({
                    host: 'http://loki:3100',
                    format: Winston.format.json()
                })
            ]
        });
    }
}

export default Logger;
