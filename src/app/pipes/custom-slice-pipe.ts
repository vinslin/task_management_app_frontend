import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSlice',
})
export class CustomSlicePipe implements PipeTransform {
  transform(value: string, start: number, end: number): string {
    if (!value) return '';

    return value.slice(start, end);
  }
}
