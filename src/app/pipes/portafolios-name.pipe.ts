import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'portafoliosName'
})
export class PortafoliosNamePipe implements PipeTransform {

  transform(value: string, arrayPortafolios:[]): any {
   if(arrayPortafolios){
    console.log(arrayPortafolios.filter((x:any)=> x.id == value ))
   }
    return 'portafoli';
  }

}
