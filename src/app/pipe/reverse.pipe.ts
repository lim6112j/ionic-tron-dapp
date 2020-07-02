import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): any[] {
    return value.sort((a,b) => a - b);
  }

}
