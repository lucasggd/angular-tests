import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PokemonNamePipe } from '../../shared/pipes/pokemon-name-pipe';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule, PokemonNamePipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  @Input(`selectedPokemon`) selectedPokemon: any = null;
}
