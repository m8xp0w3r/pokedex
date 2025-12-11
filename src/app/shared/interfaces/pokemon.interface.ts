import { Sprites } from "./sprites.interface";
import { PokemonType } from "./pokemon-type.interface";
import { PokemonSpecies } from "./pokemon-species.interface";
import { PokemonStats } from "./pokemon-stats.interface";


export interface Pokemon {
  id: number;
  name: string;
  sprites: Sprites;
  types: PokemonType[];
  weight: number;
  height: number;
  species: PokemonSpecies;
  genus: string;
  stats: PokemonStats[];
}
