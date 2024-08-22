import { IDataService } from "../../../domain/service/IDataService";
import { IController } from "../../../ports/web/protocols/Controller";
import { HttpRequest, HttpResponse } from "../../../ports/web/protocols/http";
import { CreateDataRequest } from "../dtos/CreateDataRequest";

export class CreateDataController implements IController {
    constructor(
        private readonly dataService: IDataService
    ) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        let dataDto = request.body as CreateDataRequest
        let createdData = await this.dataService.CreateData(dataDto.content)

        return {
            statusCode: 201,
            body: createdData
        }
    }
}