export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: Stat;
}

export interface Stat {
  name: string;
  url: string;
}
