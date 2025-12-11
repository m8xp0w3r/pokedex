import { signalStore, withState } from "@ngrx/signals";
import { PokemonInfoApiResult } from "../interfaces/pokemon-info-api-result.interface";
import { PokemonInfo } from "../interfaces/pokemon-info.interface";

export const PokemonStore = signalStore(
  { providedIn: "root" },
  withState({
    pokemonInfoApiResult: undefined as PokemonInfoApiResult | undefined,
    pokemonInfo: [] as PokemonInfo[],
  }),
);
