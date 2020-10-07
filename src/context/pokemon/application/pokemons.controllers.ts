import { json, Request, Response } from 'express';
import { getConnection, getManager } from 'typeorm'
import { isNull } from 'util';
import { Pokemon } from '../domain/pokemon.entity';


export async function getAllPokemonsCode(req: Request, res: Response) {
  const { code } = req.params;
  const pokemons = await getManager()
    .createQueryBuilder(Pokemon, "pokemon")
    .where('pokemon.numero = :numero', {
      numero: code
    })
    .getMany()

  res.json(pokemons).send(200);
}

export async function getAllPokemonsName(req: Request, res: Response) {
  const { name } = req.params;

  const pokemons = await getManager()
    .createQueryBuilder(Pokemon, "pokemon")
    .where('pokemon.nome like :nome', { nome: `%${name}%` })
    .getMany();

  res.json(pokemons).send(200)

}

export async function getAllPokemonsSpecie(req: Request, res: Response) {
  const { especie } = req.params;

  const pokemons = await getManager()
    .createQueryBuilder(Pokemon, "pokemon")
    .where("pokemon.especie like :especie", {
      especie: `%${especie}%`
    })
    .getMany();

  res.json(pokemons).send(200);

}

export async function getAllPokemonsType(req: Request, res: Response) {

  const { tipo } = req.params;

  const pokemons = getManager()
    .createQueryBuilder(Pokemon, "pokemon")
    .where("pokemon.tipo like :tipo", {
      tipo: tipo
    })
    .getMany();

  res.json(pokemons).send(200);

}

export async function getPokemon(req: Request, res: Response) {

  const { id } = req.params;
  var netxtPoke: Pokemon;
  var beforePoke: Pokemon;

  const pokemon = await getManager()
    .createQueryBuilder(Pokemon, 'pokemon').where('pokemon.id = :id', {
      id: id
    })
    .getOne();

  if(!pokemon){
    res.send(404);
  }

  const total = await getManager()
    .createQueryBuilder(Pokemon, 'pokemon').getCount();

  var idNext: number = (parseInt(id) < total) ? (parseInt(id) + 1) : 1;



  var idBefore: number = (pokemon.id == 1) ? total : (pokemon.id - 1);

  do {
    netxtPoke = await getManager()
      .createQueryBuilder(Pokemon, 'pokemon').where('pokemon.id = :id', {
        id: idNext++
      })
      .getOne();

  } while (netxtPoke == undefined)

  do {

    beforePoke = await getManager()
      .createQueryBuilder(Pokemon, 'pokemon').where('pokemon.id = :id', {
        id: idBefore--
      })
      .getOne();

  } while (beforePoke == undefined)

  var retPoke: any = pokemon

  retPoke.total = total

  retPoke.links = {
    self: {
      href: `http://${process.env.VIRTUAL_HOST}:${process.env.LISTEN_PORT}/pokemons`
    },
    nextItem: {
      href: `http://${process.env.VIRTUAL_HOST}:${process.env.LISTEN_PORT}/pokemons/${netxtPoke.id}`
    },
    beforeItem: {
      href: `http://${process.env.VIRTUAL_HOST}:${process.env.LISTEN_PORT}/pokemons/${beforePoke.id}`
    },
    delete: {
      href: `http://${process.env.VIRTUAL_HOST}:${process.env.LISTEN_PORT}/pokemons/${id}`
    }
  }

  res.json(retPoke).send(200)
}

export async function getPokemons(req: Request, res: Response) {
  const pokemons = await getManager()
    .createQueryBuilder(Pokemon, "pokemon").getMany();

  res.json(pokemons).send(200)
}

export async function deletePokemon(req: Request, res: Response) {
  const { id } = req.params;

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Pokemon)
    .where('id = :id', {
      id: parseInt(id)
    })
    .execute();

  res.json({
    masg: "Pokemon Deletado Com Sucesso"
  }).send(201)

}

export async function setPokemons(req: Request, res: Response) {
  var { pokemons } = req.body;
  await pokemons.map(async (pokemon) => {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Pokemon)
      .values([
        {
          descricao: pokemon.description,
          linhaEvolutiva: pokemon.evolution_line,
          imagem: pokemon.image_url,
          numero: parseInt(pokemon.number),
          nome: pokemon.name,
          shinyColoring: pokemon.shiny_coloring,
          nomeJapones: pokemon.japanese_name,
          especie: pokemon.species,
          peso: pokemon.weigth,
          altura: pokemon.heigth,
          tipo: pokemon.type
        }
      ])
      .execute()
  })

  res.send(201)

}