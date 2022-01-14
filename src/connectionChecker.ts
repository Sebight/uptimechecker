import axios from 'axios';
import { errorMonitor } from 'events';
import { performance } from 'perf_hooks';

export async function Check(config: any)
{
    let endpoints = config.endpoints;

    for (let endpoint of endpoints)
    {
        let result = "";
        let time1 = performance.now();
        try {
            let url = endpoint.url;
            let method = endpoint.method;
            let headers = endpoint.headers;
            let response = await axios({
                method: method,
                url: url,
                headers: headers
            });
            if (response.status == 200)
            {
                console.log("endpoint available ("+url+")");
                result = "endpoint available ("+url+")";
            }
            // console.log(response.status + " on endpoint " + url);    
        } catch(error: any)
        {
            console.log("endpoint is either down, or unavailable ("+endpoint.url+")");
            result = "endpoint is either down, or unavailable ("+endpoint.url+")";
        }

        let time2 = performance.now();
        let timeTaken = time2 - time1;

        if (process.env.LOG_TIME == "YES") console.log("[connectionChecker] Time taken sending request: " + timeTaken + "ms");
        return result;
    }
}

