import { Data } from "../../domain/model/data"
import { IDataService } from "../../domain/service/IDataService"
import { IExternalApi } from "../../ports/driving/ExternalAPI/IExternalAPI"

export class DataService implements IDataService {
    constructor(
        private readonly dataApi: IExternalApi
    ) { }

    async GetData(id: number): Promise<Data> {
        return  this.dataApi.getData(id)
    }

    async CreateData(content: string): Promise<Data> {
        return this.dataApi.createData(content)
    }
}