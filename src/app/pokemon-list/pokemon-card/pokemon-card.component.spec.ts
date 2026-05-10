import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardComponent } from './pokemon-card.component';

import { getPokemonByNameMock } from '../../mock/pokemon-list/getPokemonByName';
import { By } from '@angular/platform-browser';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.selectedPokemon = getPokemonByNameMock;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create card of selected pokemon', () => {
    const pokemonCardList = fixture.debugElement.query(By.css('[data-testId="pokemon-list"]'));
    expect(pokemonCardList).toBeTruthy();
  });

  it('Should create card pokemon img', () => {
    const imgPokemon = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    expect(imgPokemon.getAttribute('src')).toBe(getPokemonByNameMock.sprites.front_default);
  });

  it('Should create card pokemon name', () => {
    const pokemonName = fixture.debugElement.query(By.css('[data-testId="pokemon-name"]'))
      .nativeElement as HTMLElement;
    expect(pokemonName.textContent.toLowerCase()).toBe(getPokemonByNameMock.name.toLowerCase());
  });

  it('Should create card pokemon type chip list', () => {
    getPokemonByNameMock.types.forEach((item) => {
      const typeChip = fixture.debugElement.query(By.css('.' + item.type.name + '-chip'))
        .nativeElement as HTMLElement;
      expect(typeChip.textContent.toLowerCase().trim()).toBe(item.type.name.toLowerCase());
    });
  });
});
