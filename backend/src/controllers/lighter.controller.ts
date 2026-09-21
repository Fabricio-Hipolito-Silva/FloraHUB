import {FastifyReply, FastifyRequest} from "fastify";
import{
    getLighterStatus,
    changeLighterState
    
} from "../services/tuya.service.js";
import { HSV } from "../types/lighter.js";
import { LighterState } from "../types/lighter.js";
export async function getLighter(
    request: FastifyRequest,
    reply: FastifyReply
){
    const status = await getLighterStatus();
    return reply.send(status);
}
export async function changeState(
    request: FastifyRequest<{Body: LighterState}>,
    reply: FastifyReply
){
    const state = request.body;
    console.log(`Actual state: ${JSON.stringify(state)}`);
   await changeLighterState(request.body); 
    return reply.send({
        success:true
    });
}
