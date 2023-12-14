import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from "../../../../models/pokemon.interface";

@Component({
  selector: 'app-pokemon-card-header',
  templateUrl: './pokemon-card-header.component.html',
  styleUrls: ['./pokemon-card-header.component.scss'],
})
export class PokemonCardHeaderComponent  implements OnInit {
  @Input() pokemon: Pokemon | undefined;

  constructor() { }

  ngOnInit() {}

}
