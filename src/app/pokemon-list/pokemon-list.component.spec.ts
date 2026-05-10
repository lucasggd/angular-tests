import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { PokemonListService } from './pokemon-list.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { getPokemonByNameMock } from '../mock/pokemon-list/getPokemonByName';
import { getPokemonListMock } from '../mock/pokemon-list/getPokemonList';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { MockComponent } from 'ng-mocks';

const mockService = {
  getPokemonList: vi.fn().mockReturnValue(of(getPokemonListMock)),
  getPokemonByName: vi.fn().mockReturnValue(of(getPokemonByNameMock)),
};

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MockComponent(PokemonCardComponent),
      ],
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

  it('Validate pokemon-card input', () => {
    component.selectedPokemonControl.setValue('gengar');
    component.selected();
    fixture.detectChanges();

    const cardMock = fixture.debugElement.query(By.css('app-pokemon-card'));
    const cardComponent = cardMock.componentInstance;

    console.log(cardComponent.loading);

    expect(cardComponent.selectedPokemon).toBe(component.selectedPokemon());
  });
});
