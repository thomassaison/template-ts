export type HttpResponse = {
    statusCode: number;
    body?: any;
}

export type HttpRequest = {
    method: string;
    url: string;
    body?: any;
    query?: any;
    headers?: any;
    params?: any;
}