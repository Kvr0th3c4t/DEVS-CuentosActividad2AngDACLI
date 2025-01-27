import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { IProducto } from '../../interfaces/iproducto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})

export class ProductFormComponent {

    productoService = inject(ProductoService);
    productoForm : FormGroup;
    productoNuevo : IProducto;
    
    @Input() miProducto!:IProducto;
  
    constructor(){
      this.productoForm = new FormGroup({
        _id: new FormControl(uuidv4(),[Validators.required]),
        name: new FormControl('',[Validators.required, Validators.minLength(4)]),
        description: new FormControl('',[Validators.required, Validators.maxLength(90)]),
        price: new FormControl(null,[Validators.required, Validators.min(0), Validators.max(9999)]),
        category: new FormControl('',[Validators.required]),
        image: new FormControl('',[Validators.required, Validators.pattern(/^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/i)]),
        active: new FormControl(false,[Validators.required]),
      },[]);

      this.productoNuevo={
        _id: uuidv4(),
        name: "",
        description: "",
        price: 0,
        category: "",
        image: "",
        active: false
      };
    };

    getDataFormAdd():IProducto{
      this.productoNuevo = this.productoForm.value;
      this.productoForm.reset({
        _id: uuidv4(),
        name: "",
        description: "",
        price: 0,
        category: "",
        image: "",
        active: false
      }
      );
      return this.productoNuevo;
    }

    agregarProducto():void{
      this.productoService.addProducto(this.getDataFormAdd());
    }

    checkControl(formControlName: string, validador: string): boolean | undefined {
      return this.productoForm.get(formControlName)?.hasError(validador) && this.productoForm.get(formControlName)?.touched;
    };

}
