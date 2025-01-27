import { Component } from '@angular/core';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { FooterComponent } from "./components/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, NavBarComponent, ProductFormComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DefinitivaActividad2';
}
