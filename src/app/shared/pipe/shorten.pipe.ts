import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, max: number): any {
    return value.length > max ? value.slice(0, max) : value;
  }

}
