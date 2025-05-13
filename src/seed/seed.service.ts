import { Injectable } from '@nestjs/common';
import { PokeapiResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  // private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeapiResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      pokemonToInsert.push({ no, name });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return `Seed executed successfully! ${data.results.length} pokemons found.`;
  }
  // async executeSeed() {
  //   await this.pokemonModel.deleteMany({});

  //   const { data } = await this.axios.get<PokeapiResponse>(
  //     'https://pokeapi.co/api/v2/pokemon?limit=99',
  //   );

  //   const insertPromisesArray: Promise<Pokemon>[] = [];

  //   data.results.forEach(({ name, url }) => {
  //     const segments = url.split('/');
  //     const no = +segments[segments.length - 2];

  //     // await this.pokemonModel.create({ no, name });

  //     insertPromisesArray.push(this.pokemonModel.create({ no, name }));
  //   });

  //   await Promise.all(insertPromisesArray);

  //   return `Seed executed successfully! ${data.results.length} pokemons found.`;
  // }
}
