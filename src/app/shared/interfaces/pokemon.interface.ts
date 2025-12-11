import { Sprites } from "./sprites.interface";
import { Type } from "./type.interface";
import { PokemonType } from "./pokemon-type.interface";
import { PokemonSpecies } from "@interfaces/pokemon-species.interface";
import { PokemonStats } from "@interfaces/pokemon-stats.interface";

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
