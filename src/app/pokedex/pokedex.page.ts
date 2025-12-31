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
  ModalController,
} from "@ionic/angular/standalone";
import { PokemonStore } from "../shared/stores/pokemon.store";
import { PokemonCardComponent } from "./pokemon-card/pokemon-card.component";
import { InfiniteScrollCustomEvent } from "@ionic/angular";
import { NamedAPIResource, Pokemon } from "pokenode-ts";
import { PokemonDetailComponent } from "./pokemon-detail/pokemon-detail.component";

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
  private modalController: ModalController = inject(ModalController);
  protected pokemonInfos: Signal<NamedAPIResource[]> =
    this.#pokemonStore.pokemonInfo;

  async onIonInfinite(event: InfiniteScrollCustomEvent) {
    await this.#pokemonStore.fetchPokemonInfos();
    await event.target.complete();
  }

  async openPokemonDetail(pokemon: Pokemon) {
    console.log("NL: selected: ", pokemon.name);
    const modal = await this.modalController.create({
      component: PokemonDetailComponent,
      componentProps: { pokemon },
    });
    return await modal.present();
  }
}
