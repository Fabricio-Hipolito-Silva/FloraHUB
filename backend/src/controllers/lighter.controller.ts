import {FastifyReply, FastifyRequest} from "fastify";
import{
    getLighterStatus,
    turnLighterOn,
    turnLighterOff
} from "../services/tuya.service.js";
export async function getLighter(
    request: FastifyRequest,
    reply: FastifyReply
){
    const status = await getLighterStatus();
    return reply.send(status);
}
export async function turnOn(
    request: FastifyRequest,
    reply: FastifyReply
){
    const status = await turnLighterOn();
    return reply.send({
        success:true
    });
}
export async function turnOff(
    request: FastifyRequest,
    reply: FastifyReply
){
    const status = await turnLighterOff();
    return reply.send({
        success:true
    });
}



