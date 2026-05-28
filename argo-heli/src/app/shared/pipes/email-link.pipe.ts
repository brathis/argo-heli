import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailLink',
  standalone: true,
})
export class EmailLinkPipe implements PipeTransform {
  transform(value: string): string {
    return `mailto:${value}`;
  }
}
