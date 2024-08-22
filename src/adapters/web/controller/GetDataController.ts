import { IDataService } from "../../../domain/service/IDataService";
import { ExternalApiErrors } from "../../../ports/driving/ExternalAPI/Errors";
import { IController } from "../../../ports/web/protocols/Controller";
import { HttpRequest, HttpResponse } from "../../../ports/web/protocols/http";

export class GetDataController implements IController {
    constructor(
        private readonly dataService: IDataService
    ) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        let id: number = parseInt(request.params.id, 10);
        return this.dataService.GetData(id)
            .then(r => {
                return {
                    statusCode: 200,
                    body: r
                }
            })
            .catch(err => {
                if (err === ExternalApiErrors.DATA_NOT_FOUND) {
                    return {
                        statusCode: 404,
                        body: err,
                    }
                }

                return {
                    statusCode: 500,
                    body: err,
                }
            })
    }
}