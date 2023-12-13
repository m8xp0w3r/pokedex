import { PokemonImage } from "./pokemon-image.interface";
import { OtherSprites } from "./other-sprites.interface";

export interface Sprites extends PokemonImage {
  other: OtherSprites;
}
