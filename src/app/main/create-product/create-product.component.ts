import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../service/products.service';
import { InputComponent } from '../../shared/input/input.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { CategoriesService } from '../../service/categories.service';
import { Category, Product } from '../interfaces/products';
import { Categories } from '../interfaces/categories';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    ToastModule,
    ProductFormComponent,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  categories: Categories[] = [];
  category: any;
  productForm: Product = {
    id: 0,
    title: '',
    slug: '',
    price: 0,
    description: '',
    category: {
      id: 0,
      name: '',
      image: '',
      creationAt: '',
      updatedAt: '',
      slug: '',
    },
    images: [],
    creationAt: '',
    updatedAt: '',
  };
  constructor(
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(product: any) {
    if (!product) {
      return;
    }

    this.productService.createProduct(product).subscribe(() => {
      this.router.navigateByUrl('/products');
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product has been added',
      });
    });
  }
}
