// aca se escribre el codigo javascript
const comprarComics = () => {
    let producto = '';
    let cantidad = 0;
    let precio = 0;
    let total = 0;
    let seguirComprando = false;

    do {
        producto = prompt('mangas ibrea, mangas panini o ambas?');
        cantidad = parseInt(prompt('cuantos comics queres?'));
        
        // console.log(cantidad)
        let cantidadValida = validarCantidad(cantidad)

        switch (producto) {
            case 'ibrea':
                precio = 200;
                break;
            case 'panini':
                precio = 500;
                break;
            case 'ambas':
                precio  = 700;
                break;

            default:
                alert('algo esta saliendo mal')
                precio = 0
                cantidadValida = 0
        }

        total += precio * cantidadValida

        seguirComprando = confirm('vas a seguir comprando?');
    } while (seguirComprando);

    const totalDescuento = descuentoIbrea(total);
    calcularEnvio(totalDescuento);
};

const validarCantidad = (cantidad) => {
     while (Number.isNaN(cantidad) || cantidad <= 0) {
        if (cantidad <= 0) {
            alert('debe ingresar una cantidad valida')
        } else {
            alert('debe agregar un numero')

        }
        cantidad = parseInt(prompt('cuantos queres comprar?'));
     }
    
     return cantidad
 };

const descuentoIbrea = (total) => {
    let totalDescuento = 0

    if(total > 4200){
        totalDescuento = total * 0.9;
        return totalDescuento;
    }else {
        return total;
    }

}

const calcularEnvio = (total) => {
    let tieneEnvio = false;

    tieneEnvio = confirm('Quieres envio?')

    let km = 0;
      km = parseInt(prompt('ingrese distancia que se encuenta de la sucursal en km'))

   
  
    if (tieneEnvio && km < 10) {
        alert('Su envio es gratis')
        
    } else if (tieneEnvio && km >= 10){
        total += 1000
        alert('Su envio cuesta $1000')
    } else {
        alert('el total de su compra es $'+total)
    }

}


comprarComics()
