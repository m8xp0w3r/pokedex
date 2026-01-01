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
import { Ability, Move, MoveClient, PokemonClient } from "pokenode-ts";
import { PokemonDetailData } from "../pokemon-detail-data";

export interface PokemonAbility extends Ability {
  effectName: string;
}

export interface CustomPokemonMove {
  name: string;
  description: string;
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
  private pokemonMoveClient: MoveClient = new MoveClient();
  private modalCtrl: ModalController = inject(ModalController);
  protected pokemonHeight: Signal<number> = computed(
    () => this.pokemonDetailData().pokemon.height / 10,
  );
  protected pokemonWeight: Signal<number> = computed(
    () => this.pokemonDetailData().pokemon.weight / 10,
  );

  private pokemonAbilitiesResource: Resource<PokemonAbility[] | undefined> =
    resource({
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

  private pokemonMovesResource: Resource<CustomPokemonMove[] | undefined> =
    resource({
      // Define a reactive computation.
      // The params value recomputes whenever any read signals change.
      params: () => ({
        pokemonMoves: this.pokemonDetailData().pokemon.moves,
      }),
      // Define an async loader that retrieves data.
      // The resource calls this function every time the `params` value changes.
      loader: async ({ params }): Promise<CustomPokemonMove[]> => {
        const moves: CustomPokemonMove[] = [];
        const moveLength: number = params.pokemonMoves.length;
        const length: number = moveLength > 7 ? 7 : moveLength;

        for (let i = 0; i < length; i++) {
          const move: Move = await this.pokemonMoveClient.getMoveByName(
            params.pokemonMoves[i].move.name,
          );

          const name: string =
            move.names.find((name) => name.language.name === "de")?.name ||
            move.name;
          const description: string =
            move.flavor_text_entries.find(
              (entry) => entry.language.name === "de",
            )?.flavor_text || "-";
          moves.push({ name, description });
        }

        return moves;
      },
    });

  protected pokemonAbilities: Signal<PokemonAbility[]> = computed(
    () => this.pokemonAbilitiesResource.value() || [],
  );
  protected pokemonMoves: Signal<CustomPokemonMove[]> = computed(
    () => this.pokemonMovesResource.value() || [],
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
