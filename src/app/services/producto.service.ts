import { Injectable } from '@angular/core';
import { IProducto } from '../interfaces/iproducto';
import { Ifiltros } from '../interfaces/ifiltros';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private arrayProducto: IProducto [];

  constructor() {

    this.arrayProducto = [];

    fetch("https://jsonblob.com/api/1319286092146597888")
    .then(response => response.json())
    .then(productos => {
      productos.forEach((element:any) =>{
        let producto = element as IProducto;
        this.arrayProducto.push(producto);
      });
    });
  }

  getAllProductos(): IProducto[] {
    return this.arrayProducto;
  }

  deleteByUID(uid: string): IProducto[]{
    let i = this.arrayProducto.findIndex(producto => producto._id === uid);

    if(i != -1 && i>= 0 && i<=this.arrayProducto.length){
      this.arrayProducto.splice(i,1);
    }
    return this.arrayProducto;
  }

  addProducto(producto:IProducto): IProducto[]{
    this.arrayProducto.push(producto);
    return this.arrayProducto;
  }  

  filtrarProductos(filtros:Ifiltros): IProducto[]{
    
    return this.arrayProducto.filter(producto =>{
      return(
        (!filtros.name || producto.name.toLowerCase().includes(filtros.name.toLowerCase())) &&
        (!filtros.category || producto.category === filtros.category) &&
        (filtros.minPrice === undefined || producto.price >= filtros.minPrice) &&
        (filtros.maxPrice === undefined || producto.price <= filtros.maxPrice) &&
        (filtros.active === undefined || producto.active === filtros.active)
      );
    })
  };
}
