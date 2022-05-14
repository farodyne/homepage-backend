/**
 * Author: Federico Engler
 *
 * This utility logger class acts as a thin wrapper that wraps an instance of
 * a Winston logger and registers a Loki transport to allow me to analyze my
 * logs in Grafana.
 */
import Winston from 'winston';
import LokiTransport from 'winston-loki';
import environment from './environment';

class Logger {
    /**
     * A instance of a Winston logger with a transport for standard console
     * logging and an additional one for Loki/Grafana.
     * @returns A logger with pre-registered transports.
     */
    constructor() {
        const { lokiHost, lokiPort } = environment;

        return Winston.createLogger({
            defaultMeta: { service: 'farodyne-backend' },
            transports: [
                new Winston.transports.Console({
                    format: Winston.format.json()
                }),
                new LokiTransport({
                    host: `${lokiHost}:${lokiPort}`,
                    format: Winston.format.json()
                })
            ]
        });
    }
}

export default Logger;
