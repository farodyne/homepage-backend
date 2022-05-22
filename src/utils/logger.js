/**
 * Author: Federico Engler
 *
 * This utility logger class acts as a thin wrapper that wraps an instance of
 * a Winston logger and registers a Loki transport to allow me to analyze my
 * logs in Grafana.
 */
import { createLogger, format, transports } from 'winston';
import LokiTransport from 'winston-loki';
import environment from './environment';

class Logger {
    /**
     * @param {string} label - The label to apply in this logger.
     * @param {string} level - The maximum log level to show.
     * A instance of a Winston logger with a transport for standard console
     * logging and an additional one for Loki/Grafana.
     * @returns A logger with pre-registered transports.
     */
    constructor(label, level) {
        const { lokiHost, lokiPort } = environment;
        const logFormat = this.getLogFormat(label);

        return createLogger({
            level: level || 'debug',
            format: logFormat,
            transports: [
                new transports.Console(),
                new LokiTransport({
                    host: `${lokiHost}:${lokiPort}`,
                    format: logFormat
                })
            ]
        });
    }

    /**
     * Defines the log format for our logger.
     * @param {string} label - The label to apply in this logger.
     * @return {Object} A logger format object.
     */
    getLogFormat(label) {
        return format.combine(format.timestamp(), format.label({ label }), format.json());
    }
}

export default Logger;
