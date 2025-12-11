import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from "@ngrx/signals";
import { PokemonInfoApiResult } from "../interfaces/pokemon-info-api-result.interface";
import {
  PokemonInfo,
  PokemonInfoResult,
} from "../interfaces/pokemon-info.interface";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

export const PokemonStore = signalStore(
  { providedIn: "root" },
  withState({
    pokemonInfoApiResult: undefined as PokemonInfoApiResult | undefined,
    pokemonInfo: [] as PokemonInfo[],
  }),
  withProps(() => ({
    _httpClient: inject(HttpClient),
    _pokemonInfoApiResultKey: "pokemonInfoApiResult",
    _pokemonStorageKey: "pokemonStorageKey",
  })),
  withMethods((store) => ({
    fetchPokemonInfos: async (fromScroll: boolean): Promise<void> => {
      let pokemonInfoApiResult: PokemonInfoApiResult | undefined;
      let url: string = "https://pokeapi.co/api/v2/pokemon?limit=30";
      let pokemonInfo: PokemonInfo[] = [];

      if (fromScroll) {
        pokemonInfo = store.pokemonInfo();
        let currentApiResult: PokemonInfoApiResult | undefined =
          store.pokemonInfoApiResult();

        if (currentApiResult && currentApiResult.next) {
          url = currentApiResult.next;
        }

        pokemonInfoApiResult = await firstValueFrom(
          store._httpClient.get<PokemonInfoApiResult>(url),
        );
      } else {
        //pokemonInfo = await storageService.get<PokemonInfo[]>(pokemonStorageKey) ?? [];
        //pokemonInfoApiResult = await storageService.get<PokemonInfoApiResult>(pokemonInfoApiResultKey);
        if (!pokemonInfoApiResult) {
          pokemonInfoApiResult = await firstValueFrom(
            store._httpClient.get<PokemonInfoApiResult>(url),
          );
        }
      }

      const pokemonInfoResultData: PokemonInfo[] = pokemonInfoApiResult.results
        .map((result: PokemonInfoResult) => {
          const url = result.url;
          const match = url.match(/\/(\d+)\/?$/);
          const id = match ? Number(match[1]) : -1;

          return {
            name: result.name,
            url: url,
            id,
          };
        })
        .filter((value) => value.id !== -1);
      pokemonInfo = [...pokemonInfo, ...pokemonInfoResultData];
      //await storageService.set(pokemonInfoApiResultKey, pokemonInfoApiResult);
      //await storageService.set(pokemonStorageKey, pokemonInfo);
      patchState(store, { pokemonInfoApiResult, pokemonInfo });
    },
  })),
  withHooks((store) => ({
    onInit: async () => {
      await store.fetchPokemonInfos(false);
    },
  })),
);
