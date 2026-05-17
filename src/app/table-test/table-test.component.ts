import { ChangeDetectorRef, Component } from '@angular/core';
import { CdkTableComponent } from '../cdk-table/cdk-table.component';
import { CommonModule } from '@angular/common';
import { PokemonListService } from '../pokemon-list/pokemon-list.service';

interface PokemonInter {
  count: number;
  next: string;
  previous: string | null;
  results: any[];
}

@Component({
  selector: 'app-table-test',
  imports: [CdkTableComponent, CommonModule],
  templateUrl: './table-test.component.html',
  styleUrl: './table-test.component.css',
})
export class TableTestComponent {
  columns = [`name`, `url`, `Ações`];
  data!: PokemonInter;

  constructor(
    public _pokemonListService: PokemonListService,
    public cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._pokemonListService.getPokemonList().subscribe((data) => {
      this.data = data;

      this.cdr.detectChanges();
      console.log('👽 ~ TableTestComponent ~ ngOnInit ~ data:', data);
    });
  }
}
