import { Component, inject, Input, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { PokemonInfo } from "../../../models/pokemon-info.interface";
import { Pokemon } from "../../../models/pokemon.interface";
import { PokemonService } from "../../../services/pokemon.service";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  private pokemonService: PokemonService = inject(PokemonService);
  @Input() pokemonInfo: PokemonInfo | undefined;
  public pokemonSignal: WritableSignal<Pokemon | undefined> = signal(undefined);

  async ngOnInit() {
    if (this.pokemonInfo) {
      const pokemon = await this.pokemonService.fetchPokemon(this.pokemonInfo.url);
      if (pokemon) {
        this.pokemonSignal.set(pokemon);
      }
    }
  }
}
