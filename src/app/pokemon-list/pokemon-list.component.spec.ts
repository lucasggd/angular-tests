import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { PokemonListService } from './pokemon-list.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { getPokemonByNameMock } from '../mock/pokemon-list/getPokemonByName';
import { getPokemonListMock } from '../mock/pokemon-list/getPokemonList';

const mockService = {
  getPokemonList: vi.fn().mockReturnValue(of(getPokemonListMock)),
  getPokemonByName: vi.fn().mockReturnValue(of(getPokemonByNameMock)),
};

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [
        {
          provide: PokemonListService,
          useValue: mockService,
        },
      ],
    }).compileComponents();

    vi.clearAllMocks();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  function updateSelectedPokemon(): void {
    component.getPokemonByName$.next(getPokemonByNameMock.name);

    fixture.detectChanges();
    component.getPokemonByName$.next(getPokemonByNameMock.name);

    fixture.detectChanges();
    component.getPokemonByName$.next(getPokemonByNameMock.name);

    fixture.detectChanges();
    component.getPokemonByName$.next(getPokemonByNameMock.name);

    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get initial pokemons data', () => {
    expect(component.pokemonList.length).toBe(getPokemonListMock.results.length);
  });

  it('Should have mat option of data of pokemonListMock', () => {
    const trigger = fixture.debugElement.query(By.css('.mat-mdc-select-trigger'));
    trigger.triggerEventHandler('click');
    fixture.detectChanges();

    const matOptionList = fixture.debugElement.queryAll(By.css('mat-option > span'));
    expect(matOptionList.length).toBe(getPokemonListMock.results.length);

    const firstOptionIndex = 0;
    const secondOptionIndex = 6;

    const firstOption = matOptionList[firstOptionIndex].nativeElement as HTMLOptionElement;
    const secondOption = matOptionList[secondOptionIndex].nativeElement as HTMLOptionElement;

    expect(firstOption.textContent).toBe(getPokemonListMock.results[firstOptionIndex].name);
    expect(secondOption.textContent).toBe(getPokemonListMock.results[secondOptionIndex].name);
  });

  it('Should select a mat option and change control value', () => {
    const trigger = fixture.debugElement.query(By.css('.mat-mdc-select-trigger'));
    trigger.triggerEventHandler('click');
    fixture.detectChanges();

    const matOptionList = fixture.debugElement.queryAll(By.css('mat-option'));

    const optionClicked = 0;

    matOptionList[optionClicked].triggerEventHandler('click');
    expect(component.selectedPokemonControl.value).toBe(
      getPokemonListMock.results[optionClicked].name,
    );
  });

  it('Should create card of selected pokemon', () => {
    updateSelectedPokemon();

    const pokemonCardList = fixture.debugElement.query(By.css('[data-testId="pokemon-list"]'));
    expect(pokemonCardList).toBeTruthy();
  });

  it('Should create card pokemon img', () => {
    updateSelectedPokemon();

    const imgPokemon = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    expect(imgPokemon.getAttribute('src')).toBe(getPokemonByNameMock.sprites.front_default);
  });

  it('Should create card pokemon name', () => {
    updateSelectedPokemon();

    const pokemonName = fixture.debugElement.query(By.css('[data-testId="pokemon-name"]'))
      .nativeElement as HTMLElement;
    expect(pokemonName.textContent.toLowerCase()).toBe(getPokemonByNameMock.name.toLowerCase());
  });

  it('Should create card pokemon type chip list', () => {
    updateSelectedPokemon();

    getPokemonByNameMock.types.forEach((item) => {
      const typeChip = fixture.debugElement.query(By.css('.' + item.type.name + '-chip'))
        .nativeElement as HTMLElement;
      expect(typeChip.textContent.toLowerCase().trim()).toBe(item.type.name.toLowerCase());
    });
  });

  it('Test if input is working', () => {
    const inputValue = 'gengar';
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    input.value = inputValue;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.pokemonSearchControl.value).toBe(inputValue);
  });

  it('Test if search of input is working', () => {
    expect(mockService.getPokemonByName).toHaveBeenCalledTimes(0);

    const inputValue = 'gengar';
    component.pokemonSearchControl.setValue(inputValue);

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');

    expect(mockService.getPokemonByName).toHaveBeenCalledTimes(1);
    expect(mockService.getPokemonByName).toHaveBeenCalledWith(inputValue);
  });
});
