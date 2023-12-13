import { Sprites } from "./sprites.interface";
import { Type } from "./type.interface";
import { PokemonType } from "./pokemon-type.interface";

export interface Pokemon {
  id: number;
  name: string;
  sprites: Sprites;
  types: PokemonType[];
  weight: number;
  height: number;
}
