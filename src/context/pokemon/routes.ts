import { Router } from 'express';
import { ExpressRouter } from '../../lib/definitions';
import {
  getAllPokemonsCode,
  setPokemons,
  getAllPokemonsName,
  getAllPokemonsSpecie,
  getPokemons, 
  getAllPokemonsType, getPokemon, deletePokemon
} from './application/pokemons.controllers';

const router = Router();

router.get('/numbers/:code', getAllPokemonsCode);

router.post('/', setPokemons)

router.get('/', getPokemons)

router.get('/:id', getPokemon);

router.delete('/:id', deletePokemon);

router.get('/names/:name', getAllPokemonsName)

router.get('/species/:especie', getAllPokemonsSpecie)

router.get('/types/:tipo', getAllPokemonsType);

const expressRoute: ExpressRouter = { routeName: '/pokemons', router };

export default expressRoute;