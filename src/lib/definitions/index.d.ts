import {Router} from 'express';
import { Repository } from 'typeorm';
import { Pokemon } from '../../context/pokemon/domain/pokemon.entity';

declare interface ExpressRouter {
  routeName: string,
  router: Router
}

declare interface ContextBootstrap {
  pokemonRepository: Repository<Pokemon>;
}

declare interface TypeOrmEntity {}