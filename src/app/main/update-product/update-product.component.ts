import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from '../interfaces/products';
import { ProductsService } from '../../service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../service/categories.service';
import { Categories } from '../interfaces/categories';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    ToastModule,
    ProductFormComponent,
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
})
export class UpdateProductComponent implements OnInit {
  @Input() product!: Product;
  id!: number;
  category!: Categories;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = +param?.['id'];
      this.productsService.getProduct(this.id).subscribe((product) => {
        this.product = product;
        this.categoriesService
          .getCategoryById(product.category.id)
          .subscribe((category) => {
            this.category = category;
          });
      });
    });
  }

  onSumbit(product: Product) {
    if (!product) {
      return;
    }

    this.productsService.updateProduct(this.id, product).subscribe(() => {
      this.router.navigateByUrl('/');
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product has been updated',
      });
    });
  }
}
