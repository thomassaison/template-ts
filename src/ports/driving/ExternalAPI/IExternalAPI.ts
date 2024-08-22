import { Data } from "../../../domain/model/data"

export interface IExternalApi {
    getData(id: number): Promise<Data>
    createData(content: string): Promise<Data>
}