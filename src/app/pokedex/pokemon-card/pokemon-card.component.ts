import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  resource,
  Resource,
  Signal,
} from "@angular/core";
import { PokemonInfo } from "../../shared/interfaces/pokemon-info.interface";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/angular/standalone";
import { PokemonDetailData } from "../../shared/interfaces/pokemon-detail-data.interface";
import { PokemonNameI18n } from "../../shared/interfaces/pokemon-name-i18n.interface";
import { PokemonGenusI18n } from "../../shared/interfaces/pokemon-genus-i18n.interface";
import { Pokemon, PokemonClient } from "pokenode-ts";

@Component({
  selector: "latschi-pokedex-pokemon-card",
  templateUrl: "./pokemon-card.component.html",
  styleUrls: ["./pokemon-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
  ],
})
export class PokemonCardComponent {
  private pokemonClient: PokemonClient = new PokemonClient();

  public pokemonInfo: InputSignal<PokemonInfo> = input.required<PokemonInfo>();
  private pokemonResource: Resource<Pokemon | undefined> = resource({
    // Define a reactive computation.
    // The params value recomputes whenever any read signals change.
    params: () => ({ name: this.pokemonInfo().name }),
    // Define an async loader that retrieves data.
    // The resource calls this function every time the `params` value changes.
    loader: async ({ params }) =>
      await this.pokemonClient.getPokemonByName(params.name),
  });

  private pokemonDetailDataResource: Resource<PokemonDetailData | undefined> =
    resource({
      // Define a reactive computation.
      // The params value recomputes whenever any read signals change.
      params: () => ({ url: this.pokemonResource.value()?.species.url }),
      // Define an async loader that retrieves data.
      // The resource calls this function every time the `params` value changes.
      loader: async ({ params }) => {
        return Promise.resolve(undefined);
        //const res: Response = await fetch(params.url);
        //return res.json();
      },
    });

  protected pokemon: Signal<Pokemon | undefined> = computed(() =>
    this.pokemonResource.value(),
  );

  protected pokemonImage: Signal<string | null> = computed(() => {
    const pokemon: Pokemon | undefined = this.pokemon();
    if (!pokemon) return "";
    if (pokemon.sprites.other) {
      return pokemon.sprites.other["official-artwork"].front_default;
    }
    return pokemon.sprites.front_default;
  });

  protected pokemonName: Signal<string> = computed(() => {
    const pokemonDetailData: PokemonDetailData | undefined =
      this.pokemonDetailDataResource.value();
    const germanPokemonName: PokemonNameI18n | undefined =
      pokemonDetailData?.names.find(
        (name) => name.language.name.toLowerCase() === "de",
      );
    return germanPokemonName?.name || this.pokemonInfo().name;
  });

  protected pokemonGenus: Signal<string> = computed(() => {
    const pokemonDetailData: PokemonDetailData | undefined =
      this.pokemonDetailDataResource.value();

    const genus: PokemonGenusI18n | undefined = pokemonDetailData?.genera.find(
      (genus) => genus.language.name.toLowerCase() === "de",
    );
    return genus?.genus || "";
  });
}
