import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from "@ngrx/signals";
import {
  NamedAPIResource,
  NamedAPIResourceList,
  PokemonClient,
} from "pokenode-ts";
import { isDevMode } from "@angular/core";

export const PokemonStore = signalStore(
  { providedIn: "root" },
  withState({
    pokemonInfoApiResult: undefined as NamedAPIResourceList | undefined,
    pokemonInfo: [] as NamedAPIResource[],
  }),
  withProps(() => ({
    _pokemonClient: new PokemonClient(),
  })),
  withMethods((store) => ({
    fetchPokemonInfos: async (): Promise<void> => {
      const previousPokemonInfoApiResult: NamedAPIResourceList | undefined =
        store.pokemonInfoApiResult();
      let offset = 0;
      const limit = isDevMode() ? 1 : 20;
      if (previousPokemonInfoApiResult && previousPokemonInfoApiResult.next) {
        const url: string = previousPokemonInfoApiResult.next;
        const params: URLSearchParams = new URL(url).searchParams;
        offset = Number(params.get("offset"));
      }
      const pokemonInfoApiResult: NamedAPIResourceList =
        await store._pokemonClient.listPokemons(offset, limit);
      const pokemonInfo: NamedAPIResource[] = [
        ...store.pokemonInfo(),
        ...pokemonInfoApiResult.results,
      ];
      patchState(store, { pokemonInfoApiResult, pokemonInfo });
    },
  })),
  withHooks((store) => ({
    onInit: async () => {
      await store.fetchPokemonInfos();
    },
  })),
);
