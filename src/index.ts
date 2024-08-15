import express, { Express } from "express";
import { guesses, answers, remaining } from './routes';
import bodyParser from 'body-parser';


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());
app.get("/api/guesses", guesses);
app.get("/api/answers", answers);
app.post("/api/remaining", remaining);
app.listen(port, () => console.log(`Server listening on ${port}`));
