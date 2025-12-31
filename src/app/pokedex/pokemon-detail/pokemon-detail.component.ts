import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  resource,
  Resource,
  Signal,
} from "@angular/core";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
  ModalController,
} from "@ionic/angular/standalone";
import { Ability, PokemonClient } from "pokenode-ts";
import { PokemonDetailData } from "../pokemon-detail-data";

export interface PokemonAbility extends Ability {
  effectName: string;
}

@Component({
  selector: "latschi-pokedex-pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["./pokemon-detail.component.scss"],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
  ],
})
export class PokemonDetailComponent {
  private pokemonClient: PokemonClient = new PokemonClient();
  private modalCtrl: ModalController = inject(ModalController);
  protected pokemonHeight: Signal<number> = computed(
    () => this.pokemonDetailData().pokemon.height / 10,
  );
  protected pokemonWeight: Signal<number> = computed(
    () => this.pokemonDetailData().pokemon.weight / 10,
  );

  private pokemonResource: Resource<PokemonAbility[] | undefined> = resource({
    // Define a reactive computation.
    // The params value recomputes whenever any read signals change.
    params: () => ({
      pokemonAbilities: this.pokemonDetailData().pokemon.abilities,
    }),
    // Define an async loader that retrieves data.
    // The resource calls this function every time the `params` value changes.
    loader: async ({ params }): Promise<PokemonAbility[]> => {
      const abilities: PokemonAbility[] = [];
      for (const abilityInfo of params.pokemonAbilities) {
        const ability: Ability = await this.pokemonClient.getAbilityByName(
          abilityInfo.ability.name,
        );
        ability.name =
          ability.names.find((name) => name.language.name === "de")?.name ||
          ability.name;
        const effect = ability.effect_entries.find(
          (effectEntry) => effectEntry.language.name === "de",
        );
        abilities.push({
          ...ability,
          effectName: effect?.effect ?? "no eff",
        });
      }
      return abilities;
    },
  });

  //

  protected pokemonAbilities: Signal<PokemonAbility[]> = computed(
    () => this.pokemonResource.value() || [],
  );

  public pokemonDetailData: InputSignal<PokemonDetailData> =
    input.required<PokemonDetailData>();

  async cancel(): Promise<void> {
    void this.modalCtrl.dismiss(null, "cancel");
  }

  async confirm(): Promise<void> {
    void this.modalCtrl.dismiss("", "confirm");
  }
}
