import { Component, inject, Signal } from '@angular/core';
import { PokemonInfoStore } from "../../stores/pokemon-info.store";
import { PokemonInfo } from "../../models/pokemon-info.interface";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private pokemonStore = inject(PokemonInfoStore);
  public pokemonInfos: Signal<PokemonInfo[]> = this.pokemonStore.data;
  public title = "Pokemon Übersicht";
  constructor() {}

}
