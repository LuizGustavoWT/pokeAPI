import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { TypeOrmEntity } from '../../../lib/definitions';

@Entity({
  name: 'pokemons',
})
export class Pokemon implements TypeOrmEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: "varchar"
  })
  imagem;

  @Column({
    nullable: true,
    type: "int"
  })
  numero: number;

  @Column({
    nullable: true,
    type: "varchar"
  })
  nome;

  @Column({
    nullable: true,
    type: "varchar"
  })
  shinyColoring;

  @Column({
    nullable: true,
    type: "varchar"
  })
  nomeJapones;

  @Column({
    nullable: true,
    type: "varchar"
  })
  especie;

  @Column({
    nullable: true,
    type:"varchar"
  })
  peso;

  @Column({
    type: "varchar",
    nullable: true
  })
  altura;

  @Column({
    nullable: true,
    type: "varchar"
  })
  tipo;

  @Column({
    nullable: true,
    type: "varchar"
  })
  linhaEvolutiva;

  @Column({
    nullable: true,
    type: "text"
  })
  descricao;
}