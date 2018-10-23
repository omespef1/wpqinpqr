import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estados'
})
export class EstadosPipe implements PipeTransform {

  transform(value: any, args?: any): any {
console.log(value);
    switch (value) {
      case 'A':
        return 'Abierto';
      case 'C':
        return 'Cerrado';
      case 'E':
        return 'En trámite';
      default:
        return 'Abierto';

    }
  }

}
