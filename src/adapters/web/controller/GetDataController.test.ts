import {IDataService} from "../../../domain/service/IDataService";
import { HttpRequest } from "../../../ports/web/protocols/http";
import {GetDataController} from "./GetDataController";
import {Data} from "../../../domain/model/data";
import { ExternalApiErrors } from "../../../ports/driving/ExternalAPI/Errors";
// import * as jest from 'jest';

const mockDataService: Partial<IDataService> = {}

describe('GetDataController', () => {
    it("should return 200", async () => {
        // Given
        const controller = new GetDataController(mockDataService as IDataService);
        mockDataService.GetData = jest.fn().mockResolvedValue({
            value: "any content",
            id: 1
        });

        const httpRequest: HttpRequest = {
            method: "any",
            url: "any",
            params: {
                id: 1
            }
        }

        // When
        const response = await controller.handle(httpRequest)

        // Then
        expect(response.statusCode).toBe(200)
    })

    it("should return the content of the retrieved data", async () => {
        const controller = new GetDataController(mockDataService as IDataService);
        const data = {
            value: "any content",
            id: 1
        }
        mockDataService.GetData = jest.fn().mockResolvedValue(data);

        const httpRequest: HttpRequest = {
            method: "any",
            url: "any",
            params: {
                id: 1
            }
        }

        // When
        const response = await controller.handle(httpRequest)

        // Then
        expect(response.body).toBe(data)
    })

    it("should return a 404 error when data not found", async () => {
        const controller = new GetDataController(mockDataService as IDataService);
        mockDataService.GetData = jest.fn().mockRejectedValue(ExternalApiErrors.DATA_NOT_FOUND);

        const httpRequest: HttpRequest = {
            method: "any",
            url: "any",
            params: {
                id: 1
            }
        }

        // When
        const response = await controller.handle(httpRequest)

        // Then
        expect(response.statusCode).toBe(404)
    })

    it("should return a 500 error on any other error, with the content of the error", async () => {
        const controller = new GetDataController(mockDataService as IDataService);
        let error = {
            code: "ANY_ERROR",
            message: "Something went wrong"
        };

        mockDataService.GetData = jest.fn().mockRejectedValue(error);

        const httpRequest: HttpRequest = {
            method: "any",
            url: "any",
            params: {
                id: 1
            }
        }

        // When
        const response = await controller.handle(httpRequest)

        // Then
        expect(response.statusCode).toBe(500)
        expect(response.body).toBe(error)
    })
})