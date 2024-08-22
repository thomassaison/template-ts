import { Data } from "../../../domain/model/data";
import { ExternalApiErrors } from "../../../ports/driving/ExternalAPI/Errors";
import { IExternalApi } from "../../../ports/driving/ExternalAPI/IExternalAPI";

export class ExternalApiInMemoryAdapter implements IExternalApi {
    in_memory_data: Data[]

    constructor() {
        this.in_memory_data = [];
    }

    async createData(content: string): Promise<Data> {
        const nData: Data = {
            id: this.in_memory_data.length,
            value: content
        }

        this.in_memory_data.push(nData)
        return nData
    }

    async getData(id: number): Promise<Data> {
        const data = this.in_memory_data.find(d => d.id === id);
        if (!data) {
            throw ExternalApiErrors.DATA_NOT_FOUND;
        }

        return data;
    }
}