import axios from 'axios';
import { errorMonitor } from 'events';
import { performance } from 'perf_hooks';
import { endpointOutput } from './Classes/endpointOuput';
import * as performanceAnalyzer from './Performance/performanceAnalyzer';

export async function Check(config: any)
{
    let endpoints = config.endpoints;
    let result: endpointOutput[] = [];

    performanceAnalyzer.startTimer("Endpoint Status Check");
    for (let endpoint of endpoints)
    {
        performanceAnalyzer.startTimer(endpoint.url+" status check");
        let output = new endpointOutput(endpoint.url, "");

        try {
            let url = endpoint.url;
            let method = endpoint.method;
            let headers = endpoint.headers;
            let response = await axios({
                method: method,
                url: url,
                headers: headers
            });
            if (response.status >= 200 && response.status <= 299)
            {
                output.status = "up";
            } else {
                output.status = "down";
            }
        } catch(error: any)
        {
            output.status = "down";
        }
        performanceAnalyzer.endTimer(endpoint.url+" status check");
        result.push(output);
    }
    performanceAnalyzer.endTimer("Endpoint Status Check");
    return JSON.stringify(result);
}

