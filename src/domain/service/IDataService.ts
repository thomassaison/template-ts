import { Data } from "../model/data";

export interface IDataService {
    GetData(id: number): Promise<Data>;
    CreateData(content: string): Promise<Data>;
}