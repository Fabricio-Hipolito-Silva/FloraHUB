import {FastifyReply, FastifyRequest} from "fastify";
import{
    getLighterStatus,
    turnLighterOn,
    turnLighterOff,
    changeLighterColor
    
} from "../services/tuya.service.js";
import { HSV } from "../types/lighter.js";
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
    await turnLighterOn();
    return reply.send({
        success:true
    });
}
export async function turnOff(
    request: FastifyRequest,
    reply: FastifyReply
){
    await turnLighterOff();
    return reply.send({
        success:true
    });
}

export async function changeColor(
    request: FastifyRequest<{Body: HSV}>,
    reply: FastifyReply
){
    const { h, s, v } = request.body;
    console.log(`Received HSV values: h=${h}, s=${s}, v=${v}`);
    await changeLighterColor(request.body);
    return reply.send({
        success:true
    });
}
