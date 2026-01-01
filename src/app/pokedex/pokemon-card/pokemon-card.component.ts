import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  resource,
  Resource,
  Signal,
} from "@angular/core";
import {
  IonCard, IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonCol, IonGrid, IonRow,
} from "@ionic/angular/standalone";
import {
  Genus,
  Name,
  NamedAPIResource,
  Pokemon,
  PokemonClient,
  PokemonSpecies,
} from "pokenode-ts";
import { PokemonDetailData } from "../pokemon-detail-data";

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
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class PokemonCardComponent {
  private pokemonClient: PokemonClient = new PokemonClient();

  public pokemonInfo: InputSignal<NamedAPIResource> =
    input.required<NamedAPIResource>();
  private pokemonResource: Resource<Pokemon | undefined> = resource({
    // Define a reactive computation.
    // The params value recomputes whenever any read signals change.
    params: () => ({ name: this.pokemonInfo().name }),
    // Define an async loader that retrieves data.
    // The resource calls this function every time the `params` value changes.
    loader: async ({ params }) =>
      await this.pokemonClient.getPokemonByName(params.name),
  });

  private pokemonSpeciesResource: Resource<PokemonSpecies | undefined> =
    resource({
      // Define a reactive computation.
      // The params value recomputes whenever any read signals change.
      params: () => ({ id: this.pokemonResource.value()?.id }),
      // Define an async loader that retrieves data.
      // The resource calls this function every time the `params` value changes.
      loader: async ({ params }) => {
        if (!params.id) return;
        return this.pokemonClient.getPokemonSpeciesById(params.id);
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
    const pokemonDetailData: PokemonSpecies | undefined =
      this.pokemonSpeciesResource.value();
    const germanPokemonName: Name | undefined = pokemonDetailData?.names.find(
      (name) => name.language.name.toLowerCase() === "de",
    );
    return germanPokemonName?.name || this.pokemonInfo().name;
  });

  protected order: Signal<number> = computed(() => {
    const pokemonDetailData: PokemonSpecies | undefined =
      this.pokemonSpeciesResource.value();
    return pokemonDetailData?.id || 0;
  });

  protected pokemonGenus: Signal<string> = computed(() => {
    const pokemonDetailData: PokemonSpecies | undefined =
      this.pokemonSpeciesResource.value();

    const genus: Genus | undefined = pokemonDetailData?.genera.find(
      (genus) => genus.language.name.toLowerCase() === "de",
    );
    return genus?.genus || " - ";
  });

  protected pokemonHeight: Signal<number> = computed(() => {
    const pokemon = this.pokemon();
    if (!pokemon) return 0;
    return pokemon.height / 10;
  });

  protected pokemonWeight: Signal<number> = computed(() => {
    const pokemon = this.pokemon();
    if (!pokemon) return 0;
    return pokemon.weight / 10;
  });

  public pokemonSelected: OutputEmitterRef<PokemonDetailData> =
    output<PokemonDetailData>();

  onPokemonSelected() {
    const pokemon: Pokemon | undefined = this.pokemon();
    if (pokemon) {
      this.pokemonSelected.emit({ pokemon, name: this.pokemonName() });
    }
  }
}
