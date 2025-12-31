import { Component, inject } from "@angular/core";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  ModalController,
} from "@ionic/angular/standalone";

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
  ],
})
export class PokemonDetailComponent {
  private modalCtrl: ModalController = inject(ModalController);

  private name: string = "";
  cancel() {
    return this.modalCtrl.dismiss(null, "cancel");
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, "confirm");
  }
}
