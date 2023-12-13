import { Sprites } from "./sprites.interface";
import { Type } from "./type.interface";

export interface Pokemon {
  id: number;
  name: string;
  sprites: Sprites;
  types: Type[];
  weight: number;
  height: number;
}
