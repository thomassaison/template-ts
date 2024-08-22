import { HttpRequest, HttpResponse } from "./http";

export interface IController<T = HttpRequest> {
    handle(request: T): Promise<HttpResponse>
}