import { PokemonInfo } from "./pokemon-info.interface";

export interface PokemonInfoApiResult {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonInfo[];
}
