import { createConnection } from 'typeorm';
import { Pokemon } from '../../context/entities';
export class ORM {


  start() {
    return createConnection({
      type: "mysql",
      host: "mysql.luizgustavowt.com.br",
      port: 3306,
      database: "cwazoiep_pokemon",
      username: "cwazoiep_pokemon",
      password: "42ZwC7wcVh7UapH",
      charset: "utf8_general_ci",
      logging: true,
      synchronize: true,
      entities: [
        Pokemon
      ],

    })
      .then(res => {
        console.log("Sucesso")
      })
      .catch(err => {
        console.log(err)
      });
  }

}