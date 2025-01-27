import { Component, EventEmitter, inject, Output } from '@angular/core';
import { IProducto } from '../../interfaces/iproducto';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Ifiltros } from '../../interfaces/ifiltros';


@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {

  filterForm:any;
  arrayProductos: IProducto[];

  @Output() filtrosAplicados: EventEmitter<any> = new EventEmitter();

  productoService = inject(ProductoService);

constructor(){
  this.arrayProductos = [];
}

getDataFilter(form: any) {

  const filtros: Ifiltros = {
    name: form.value.name || undefined,
    category: form.value.category !== 'Seleccione la categoría' ? form.value.category : undefined,
    minPrice: form.value.minPrice || undefined,
    maxPrice: form.value.maxPrice || undefined,
    active: form.value.active || true
  };

  this.filtrosAplicados.emit(filtros);

  form.reset();
}


ngOnInit(){
  this.arrayProductos = this.productoService.getAllProductos();
}

}
