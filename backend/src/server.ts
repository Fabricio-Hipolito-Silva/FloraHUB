import {fastify} from 'fastify';
import cors from "@fastify/cors";
import { lighterRoutes } from './routes/lighter.routes';

const app = fastify({
  logger: true // Habilita o logger para registrar informações sobre as requisições e respostas
}); //Cria o servidor Fastify

app.register(cors, { //Registra o CORS
    origin: true // Permite requisições de qualquer origem
}); 
app.get("/", async()=>{
    return{
        message: "FloraHUB Backend is running!"
    };
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