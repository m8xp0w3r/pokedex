import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PokemonInfo } from "../models/pokemon-info.interface";
import { PokemonInfoApiResult } from "../models/pokemon-info-api-result.interface";
import { Pokemon } from "../models/pokemon.interface";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private httpClient: HttpClient = inject(HttpClient);
  public pokemonInfos: WritableSignal<PokemonInfo[]> = signal([]);


  constructor() {
    this.fetchPokemonInfos();
  }

  public fetchPokemonInfos(): void {
    this.httpClient.get<PokemonInfoApiResult>("https://pokeapi.co/api/v2/pokemon?limit=-1")
    //this.httpClient.get<PokemonInfoApiResult>("https://pokeapi.co/api/v2/pokemon?limit=100")
      .subscribe(result => this.pokemonInfos.set(result.results));
  }

  public async fetchPokemon(url: string): Promise<Pokemon> {
    const pokemon = await firstValueFrom(this.httpClient.get<Pokemon>(url));
    pokemon.types.forEach(type => type.type.color = this.getPokemonColor(type.type.name));
    return pokemon;
  }

  private getPokemonColor(type:string): string {
    switch (type) {
      case "grass": return "success";
      case "fire": return "danger";
      default: return "tertiary";
    }
  }
}
