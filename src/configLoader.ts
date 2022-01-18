//In case you want the config to be loaded from the server, you can use this module

import {readFileSync} from 'fs';

export async function loadConfig()
{
    const config = JSON.parse(readFileSync('./endpointConfig.json', 'utf8'));
    return config;
}