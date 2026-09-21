import {FastifyInstance} from "fastify";
import{
    getLighter,
    changeState
}from "../controllers/lighter.controller.js";
export async function lighterRoutes(app: FastifyInstance) {
    app.get("/api/lighter", getLighter);
    app.post("/api/lighter/state", changeState);
       
}