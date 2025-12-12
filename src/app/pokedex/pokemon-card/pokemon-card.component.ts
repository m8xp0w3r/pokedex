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
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/angular/standalone";
import {
  Genus,
  Name,
  NamedAPIResource,
  Pokemon,
  PokemonClient,
  PokemonSpecies,
} from "pokenode-ts";

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

  protected pokemonGenus: Signal<string> = computed(() => {
    const pokemonDetailData: PokemonSpecies | undefined =
      this.pokemonSpeciesResource.value();

    const genus: Genus | undefined = pokemonDetailData?.genera.find(
      (genus) => genus.language.name.toLowerCase() === "de",
    );
    return genus?.genus || "";
  });
}
