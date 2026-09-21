import {fastify} from 'fastify';
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import path from "node:path";
import { lighterRoutes } from './routes/lighter.routes';

const app = fastify({
  logger: true // Habilita o logger para registrar informações sobre as requisições e respostas
}); //Cria o servidor Fastify

app.register(cors, { //Registra o CORS
    origin: true // Permite requisições de qualquer origem
}); 
app.register(fastifyStatic, {
    root: path.join(__dirname, "../../frontend"),
    prefix: "/"
});
app.get("/", async(request, reply)=>{
    return reply.sendFile("html/index.html")
});
app.get("/lighter", async (request, reply) => {
    return reply.sendFile("html/lighter.html");
});
app.register(lighterRoutes); //Registra as rotas do lighter

app.listen({ // Inicia o servidor na porta 3000 e no host geral
    port: 3000,
    host: "0.0.0.0"
}).then(()=>{
    console.log("Server is running on port 3000");
}).catch((err)=>{
    console.error(err);
    process.exit(1);
});