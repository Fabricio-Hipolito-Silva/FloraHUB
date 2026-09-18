import {FastifyInstance} from "fastify";
import{
    getLighter,
    turnOn,
    turnOff,
    changeColor
}from "../controllers/lighter.controller.js";
export async function lighterRoutes(app: FastifyInstance) {
    app.get("/api/lighter", getLighter);
    app.post("/api/lighter/on", turnOn);
    app.post("/api/lighter/off", turnOff);
    app.post("/api/lighter/color", changeColor);
       
}