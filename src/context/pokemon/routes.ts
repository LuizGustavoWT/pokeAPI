import { Router } from 'express';
import { ExpressRouter } from '../../lib/definitions';
import {
  getAllPokemonsCode,
  setPokemons,
  getAllPokemonsName,
  getAllPokemonsSpecie,
  getPokemons
} from './application/pokemons.controllers';

const router = Router();

router.get('/numbers/:code', getAllPokemonsCode);

router.post('/', setPokemons)

router.get('/', getPokemons)

router.get('/names/:name', getAllPokemonsName)

router.get('/species/:especie', getAllPokemonsSpecie)

const expressRoute: ExpressRouter = { routeName: '/pokemons', router };

export default expressRoute;