import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PokemonNamePipe } from '../../shared/pipes/pokemon-name-pipe';
import { PokemonListService } from '../pokemon-list.service';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule, PokemonNamePipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent implements OnInit {
  @Input(`selectedPokemon`) selectedPokemon: any = null;

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(`passou aaa`);
  }
}
