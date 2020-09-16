import { Request, NextFunction, Response } from 'express';
import {getRepository} from 'typeorm';
import { Pokemon } from '../../context/pokemon/domain/pokemon.entity';
import { ContextBootstrap } from '../definitions';


export default (req: Request, res:Response, next: NextFunction): void => {
  const ctx: ContextBootstrap = {
    pokemonRepository: getRepository(Pokemon)
  }

  Object.defineProperty(req, '$ctx', {
    value: ctx
  });

  next();
}