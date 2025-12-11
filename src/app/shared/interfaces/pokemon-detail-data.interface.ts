import { PokemonNameI18n } from "./pokemon-name-i18n.interface";
import { PokemonGenusI18n } from "./pokemon-genus-i18n.interface";

export interface PokemonDetailData {
  base_happiness: number;
  capture_rate: number;
  name: string;
  names: PokemonNameI18n[];
  genera: PokemonGenusI18n[];
}
