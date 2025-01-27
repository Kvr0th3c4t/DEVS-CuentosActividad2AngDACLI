import { ProductoService } from './../../services/producto.service';
import { Component, inject, Input } from '@angular/core';
import { IProducto } from '../../interfaces/iproducto';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  productoService = inject(ProductoService);

  @Input() miProducto!: IProducto;

  borrarProducto(producto: IProducto){
    this.productoService.deleteByUID(producto._id);
  }
}
