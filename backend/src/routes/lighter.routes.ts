import {FastifyInstance} from "fastify";
import{
    getLighter,
    turnOn,
    turnOff
}from "../controllers/lighter.controller.js";
export async function lighterRoutes(app: FastifyInstance) {
    app.get("/api/lighter", getLighter);
    app.post("/api/lighter/on", turnOn);
    app.post("/api/lighter/off", turnOff);
       
}