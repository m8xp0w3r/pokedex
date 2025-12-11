export interface PokemonInfoResult {
  name: string;
  url: string;
}

export interface PokemonInfo extends PokemonInfoResult {
  id: number;
}
