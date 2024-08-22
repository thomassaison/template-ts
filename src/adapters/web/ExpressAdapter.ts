import { Request, Response } from "express"
import { IController } from "../../ports/web/protocols/Controller";
import { HttpRequest } from "../../ports/web/protocols/http";

export function adaptExpressRoute(controller: IController) {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            method: req.method,
            url: req.url,
            body: req.body,
            headers: req.headers,
            query: req.query,
            params: req.params,
        }

        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}