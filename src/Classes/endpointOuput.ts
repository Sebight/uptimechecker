export class endpointOutput
{
    url: string;
    status: number;
    statusMessage: string;
    responseTime: number;

    constructor(url: string, status: number)
    {
        this.url = url;
        this.status = status;
        this.statusMessage = "";
        this.responseTime = 0;
    }
}