import {fastify} from 'fastify';
import cors from "@fastify/cors";
import { lighterRoutes } from './routes/lighter.routes';

const app = fastify({
  logger: true
});

app.register(cors, {
    origin: true
});
app.get("/", async()=>{
    return{
        message: "FloraHUB Backend is running!"
    };
});
app.register(lighterRoutes);

app.listen({
    port: 3000,
    host: "0.0.0.0"
}).then(()=>{
    console.log("Server is running on port 3000");
}).catch((err)=>{
    console.error(err);
    process.exit(1);
});