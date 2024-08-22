import { IExternalApi } from "../../ports/driving/ExternalAPI/IExternalAPI";
import { Data } from "../../domain/model/data";
import { DataService } from "./DataService";

const mockExternalApi: Partial<IExternalApi> = {}

describe('DataService', () => {
    describe("GetData", () => {
        it("should return the data object", async () => {
            // Given
            const returned: Data = {
                id: 100001,
                value: "any value"
            }

            let dataService = new DataService(mockExternalApi as IExternalApi);
            mockExternalApi.getData = jest.fn().mockReturnValue(returned);

            // When
            let res = await dataService.GetData(1)

            // Then
            expect(res).toBe(returned)
        })

        it("should return the external api error", async () => {
            // Given
            const error = new Error("ANY ERROR")

            let dataService = new DataService(mockExternalApi as IExternalApi);
            mockExternalApi.getData = jest.fn().mockRejectedValue(error)

            // Then
            await expect(dataService.GetData(1)).rejects.toThrow(error)
        })
    })
})