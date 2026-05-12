import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { By } from '@angular/platform-browser';
import { getPokemonByNameMock } from '../mock/pokemon-list/getPokemonByName';
import { getPokemonListMock } from '../mock/pokemon-list/getPokemonList';
import { PokemonListService } from './pokemon-list.service';
import { of } from 'rxjs';
import { MockComponent } from 'ng-mocks';

const serviceMock = {
  getPokemonList: vi.fn().mockReturnValue(of(getPokemonListMock)),
  getPokemonByName: vi.fn().mockReturnValue(of(getPokemonByNameMock)),
};

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent, MockComponent(PokemonCardComponent)],
      providers: [
        {
          provide: PokemonListService,
          useValue: serviceMock,
        },
      ],
      declarations: [PokemonListComponent],
    }).compileComponents();

    vi.restoreAllMocks();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Input control value', () => {
    const valorDeTest = `teste`;
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    input.value = valorDeTest;
    input.dispatchEvent(new Event(`input`));

    fixture.detectChanges();

    expect(component.pokemonSearchControl.value).toBe(valorDeTest);
  });

  it('Button click trigger search', () => {
    expect(component.selectedPokemon()).toBeNull();
    expect(serviceMock.getPokemonByName).toHaveBeenCalledTimes(0);
    const button = fixture.debugElement.query(By.css(`button`)).nativeElement as HTMLButtonElement;
    button.dispatchEvent(new Event(`click`));
    fixture.detectChanges();
    expect(serviceMock.getPokemonByName).toHaveBeenCalledTimes(1);
    expect(component.selectedPokemon()).toBe(getPokemonByNameMock);
  });
});
