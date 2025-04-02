import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ProductsService } from '../../service/products.service';
import { Product } from '../interfaces/products';
import { SkeletonModule } from 'primeng/skeleton';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CartItem, CartService } from '../../service/cart.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Categories } from '../interfaces/categories';
import { CategoriesService } from '../../service/categories.service';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    SkeletonModule,
    CurrencyPipe,
    DialogComponent,
    TooltipModule,
    ButtonModule,
    RouterLink,
    NgClass,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  visible: boolean = false;
  description: string = '';
  title: string = '';
  loading = false;
  isCart = false;
  cartItems: CartItem[] = [];
  total = 0;
  isUpdate: boolean = false;
  product!: Product;
  categories: Categories[] = [];
  selectedCategoryId: number | null = null;
  placeholderArray: number[] = Array(6).fill(0);

  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.checkProfile();
    this.loading = true;

    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = [{ id: null, name: 'All' }, ...categories];
    });

    this.route.queryParams.subscribe((params) => {
      this.selectedCategoryId = params['categoryId']
        ? +params['categoryId']
        : null;

      this.getProducts(this.selectedCategoryId);
    });

    this.cartService.cartItems$.subscribe((item) => (this.cartItems = item));
    this.cartService.cartTotal$.subscribe((item) => (this.total = item));
  }

  getProducts(categoryId: number | null) {
    this.loading = true;
    const query = categoryId ? `?categoryId=${categoryId}` : '';
    this.productsService.getProducts(query).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.loading = false;
        this.products = [];
      },
    });
  }

  showDescription(product: Product) {
    this.visible = true;
    this.product = product;
  }

  closeDialog() {
    this.visible = false;
    this.isCart = false;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  updateProduct(id: number) {
    this.isUpdate = true;
    this.router.navigate(['/update/', id]);
  }

  showCartDialog() {
    this.isCart = true;
    this.visible = true;
  }

  handleRemoveItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  handleUpdateQuantity(event: { id: number; quantity: number }) {
    this.cartService.updateQuantity(event.id, event.quantity);
  }

  filterByCategory(id: number) {
    this.categoriesService.getAllProductsByCategory(id).subscribe(() => {});
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onCategoryChange(event: DropdownChangeEvent) {
    const categoryId = event?.value;
    this.router.navigate([''], {
      queryParams: { categoryId: categoryId || null },
    });
    this.scrollToTop();
  }
}
