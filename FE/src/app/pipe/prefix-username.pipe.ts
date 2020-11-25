import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefixUsername'
})
export class PrefixUsernamePipe implements PipeTransform {

  transform(value: string): string {
    return value.slice(0, 2).toLocaleUpperCase();
  }

}
