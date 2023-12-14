import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PokemonCardComponent } from "./pokemon-card/pokemon-card.component";
import { PokemonCardHeaderComponent } from "./pokemon-card/pokemon-card-header/pokemon-card-header.component";
import { PokemonCardContentComponent } from "./pokemon-card/pokemon-card-content/pokemon-card-content.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, PokemonCardComponent, PokemonCardHeaderComponent, PokemonCardContentComponent]
})
export class Tab1PageModule {}
