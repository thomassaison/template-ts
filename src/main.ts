import express, {json} from 'express';
import { ExternalApiInMemoryAdapter } from './adapters/driving/ExternalApi/ExternalApiInMemoryAdapter';
import { adaptExpressRoute } from './adapters/web/ExpressAdapter';
import { CreateDataController } from './adapters/web/controller/CreateDataController';
import { GetDataController } from './adapters/web/controller/GetDataController';
import { DataService } from './app/service/DataService';

const app = express();
const port = 8080;

app.use(json())

const externalApi = new ExternalApiInMemoryAdapter()
const dataService = new DataService(externalApi)

const getDataController = new GetDataController(dataService)
const createDataController = new CreateDataController(dataService)

app.get("/data/:id", adaptExpressRoute(getDataController))
app.post("/data", adaptExpressRoute(createDataController))

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});