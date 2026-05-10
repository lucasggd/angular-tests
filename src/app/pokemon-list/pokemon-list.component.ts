import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { PokemonListService } from './pokemon-list.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PokemonNamePipe } from '../shared/pipes/pokemon-name-pipe';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    PokemonNamePipe,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  public pokemonList: any[] = [];

  public selectedPokemonControl = new FormControl();
  public pokemonSearchControl = new FormControl();
  public selectedPokemon: WritableSignal<any> = signal(null);

  public getPokemonList$ = new Subject<void>();
  public getPokemonByName$ = new Subject<string>();

  public _unsubscribe$ = new Subject<void>();

  constructor(private pokemonListService: PokemonListService) {}

  ngOnInit(): void {
    this.getPokemonList$
      .pipe(
        takeUntil(this._unsubscribe$),
        switchMap(() => this.pokemonListService.getPokemonList()),
      )
      .subscribe((data) => {
        this.pokemonList = data.results;
      });

    this.getPokemonByName$
      .pipe(
        takeUntil(this._unsubscribe$),
        switchMap((value) => this.pokemonListService.getPokemonByName(value)),
      )
      .subscribe((data) => {
        this.selectedPokemon.update((value) => data);
      });

    this.getPokemonList$.next();
  }

  selected(): void {
    this.getPokemonByName$.next(this.selectedPokemonControl.value);
  }

  searchPokemon(): void {
    this.getPokemonByName$.next(this.pokemonSearchControl.value);
  }
}
