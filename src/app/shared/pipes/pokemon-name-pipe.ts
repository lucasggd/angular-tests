import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonNamePipe',
})
export class PokemonNamePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (!value) return value;

    return value
      .toLowerCase()
      .split(' ')
      .map((text) => text.charAt(0).toUpperCase() + text.slice(1))
      .join(' ');
  }
}
