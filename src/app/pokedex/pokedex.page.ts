import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";
import { PokemonStore } from "../shared/stores/pokemon.store";
import { PokemonInfo } from "../shared/interfaces/pokemon-info.interface";
import { PokemonCardComponent } from "./pokemon-card/pokemon-card.component";
import { InfiniteScrollCustomEvent } from "@ionic/angular";

@Component({
  selector: "latschi-pokedex-pokedex-page",
  templateUrl: "./pokedex.page.html",
  styleUrls: ["./pokedex.page.scss"],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    PokemonCardComponent,
    IonGrid,
    IonRow,
    IonCol,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokedexPage {
  #pokemonStore = inject(PokemonStore);
  protected pokemonInfos: Signal<PokemonInfo[]> =
    this.#pokemonStore.pokemonInfo;

  async onIonInfinite(event: InfiniteScrollCustomEvent) {
    await this.#pokemonStore.fetchPokemonInfos(true);
    await event.target.complete();
  }
}
