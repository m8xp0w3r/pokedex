import { patchState, signalStore, withHooks, withMethods, withState, } from "@ngrx/signals";
import { PokemonInfo } from "../models/pokemon-info.interface";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tap } from "rxjs";
import { PokemonService } from "../services/pokemon.service";
import { inject } from "@angular/core";

export const PokemonInfoStore = signalStore(
  {providedIn: "root"},
  withState({
    data: [] as PokemonInfo[],
  }),
  withMethods((state) => {
    return {
      connectCriteria: rxMethod<PokemonInfo[]>((c$) =>
        c$.pipe(
          tap((data) => patchState(state, {data})),
        ),
      ),
    };
  }),
  withHooks({
    onInit({connectCriteria}) {
      const pokemonService: PokemonService = inject(PokemonService);
      connectCriteria(pokemonService.pokemonInfos);
    },
  }),
);
