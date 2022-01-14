import {readFileSync} from 'fs';

export async function loadConfig()
{
    const config = JSON.parse(readFileSync('./endpointConfig.json', 'utf8'));
    return config;
}