import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { IProducto } from '../../interfaces/iproducto';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductFilterComponent } from "../product-filter/product-filter.component";
import { Ifiltros } from '../../interfaces/ifiltros';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, ProductFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  productoService = inject(ProductoService);
  arrayProductos: IProducto[];

  constructor(){
    this.arrayProductos = [];
  }

  ngOnInit(): void{
    
    try {
      this.arrayProductos = this.productoService.getAllProductos();
    } catch (err) {
      console.log('Error al conectar a la API: ' + err);
    }
  }

  getProducto($event:Ifiltros){
    this.arrayProductos = this.productoService.filtrarProductos($event);
  }
}


