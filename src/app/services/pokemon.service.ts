import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PokemonInfo } from "../models/pokemon-info.interface";
import { PokemonInfoApiResult } from "../models/pokemon-info-api-result.interface";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private httpClient: HttpClient = inject(HttpClient);


  constructor() {
  }

  public fetchPokemonInfos(): void {
    this.httpClient.get<PokemonInfoApiResult>("https://pokeapi.co/api/v2/pokemon?limit=-1")
      .subscribe(result => {

      });
  }
}
