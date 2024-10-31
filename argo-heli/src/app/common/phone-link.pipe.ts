import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneLink',
  standalone: true,
})
export class PhoneLinkPipe implements PipeTransform {
  transform(value: string): string {
    return `tel:${value.replace(/\s/g, '')}`;
  }
}
