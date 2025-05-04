import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
import { PokeapiResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeapiResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=99',
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      console.log({ no, name });
    });

    return `Seed executed successfully! ${data.results.length} pokemons found.`;
  }
}
