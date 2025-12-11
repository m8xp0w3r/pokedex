import { NamedAPIResource } from "pokenode-ts";

export interface PokemonInfoResult {
  name: string;
  url: string;
}

export interface PokemonInfo extends NamedAPIResource {}
