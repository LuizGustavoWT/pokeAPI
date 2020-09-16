import 'reflect-metadata';
import dotenv from 'dotenv';
import cors from 'cors';
import {ORM} from './lib/configs/orm';
import {Server} from './lib/configs/server';
import PokemonRoutes from './context/pokemon/routes';

dotenv.config();

const {
  LISTEN_PORT,
  VIRTUAL_HOST,
} = process.env;


async function  bootstrap(): Promise<void> {
  const orm = new ORM();

  await orm.start();

  const server = new Server(VIRTUAL_HOST, parseInt(LISTEN_PORT));

  server.enableCors(cors());
  
  server.start();

  const routes = [PokemonRoutes]

  server.registerRoutes(routes);

}

bootstrap();
