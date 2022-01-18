import axios from 'axios';
import { errorMonitor } from 'events';
import { performance } from 'perf_hooks';
import { endpointOutput } from './Classes/endpointOuput';
import * as performanceAnalyzer from './Performance/performanceAnalyzer';

export async function Check(config: any) {
    let endpoints = config.endpoints;
    let result: endpointOutput[] = [];

    for (let endpoint of endpoints) {
        let output = new endpointOutput(endpoint.url, -1);

        let url = endpoint.url;
        let method = endpoint.method;
        let headers = endpoint.headers;

        performanceAnalyzer.startTimer("Response Time")

        await axios({
            method: method,
            url: url,
            headers: headers
        }).then(function (response) {

            let responseTime = performanceAnalyzer.endTimer("Response Time");
            output.status = response.status;
            output.statusMessage = response.statusText;
            output.responseTime = Math.round(responseTime);

        }).catch(function (error) {
            try {
                if (error.errno == undefined) {
                    throw "sys error";
                } else {
                    let responseTime = performanceAnalyzer.endTimer("Response Time");
                    output.status = error.errno;
                    output.statusMessage = error.code;
                    output.responseTime = Math.round(responseTime);
                }
            } catch (e) {
                let responseTime = performanceAnalyzer.endTimer("Response Time");
                output.status = error.response.status;
                output.statusMessage = error.response.statusText;
                output.responseTime = Math.round(responseTime);
            }
        });
        result.push(output);
    }
    return JSON.stringify(result);
}

