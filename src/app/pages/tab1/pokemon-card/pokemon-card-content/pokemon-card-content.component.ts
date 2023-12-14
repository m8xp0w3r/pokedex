import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from "../../../../models/pokemon.interface";

@Component({
  selector: 'app-pokemon-card-content',
  templateUrl: './pokemon-card-content.component.html',
  styleUrls: ['./pokemon-card-content.component.scss'],
})
export class PokemonCardContentComponent  implements OnInit {
  @Input() pokemon: Pokemon | undefined;

  constructor() { }

  ngOnInit() {}

}
