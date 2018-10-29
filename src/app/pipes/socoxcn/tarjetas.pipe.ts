import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tarjetas'
})
export class TarjetasPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  	console.log(value);
    switch (value) {

    	case "EFECTIVO":
    		return value;
    		
    	
    	default:
    		let desglose:string = value.toString();
    		console.log(desglose);
    		let tipoTarjeta = desglose.split("-")[0];
    		console.log(tipoTarjeta);
    		let numTarjeta = desglose.split("-")[1];
    		console.log(numTarjeta);
    		switch (tipoTarjeta) {
    			case "A":
    				 return  `American Express Num. ${numTarjeta}`;
				case "V":
    				  return  `Visa Num. ${numTarjeta}`;
			    case "M":
    				  return  `Master Card Num. ${numTarjeta}`;
    			
    			default:
    				// code...
    				break;
    		}
    }
  }

}
