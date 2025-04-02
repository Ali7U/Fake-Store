import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CartItem, CartService } from '../../service/cart.service';
import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { CategoryFormComponent } from '../../main/category-form/category-form.component';
import { Product } from '../../main/interfaces/products';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    AsyncPipe,
    CurrencyPipe,
    CategoryFormComponent,
    NgClass,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  selectedImage: string = '';
  @Input() visible: boolean = false; // Controls dialog visibility
  @Input() description: string = ''; // Description for product description mode
  @Input() header: string = 'Dialog'; // Dialog header
  @Input() product?: Product; // Title for product description mode
  @Input() isCart: boolean = false; // Toggles between cart and description modes
  @Input() isCategory: boolean = false;
  @Input() cartItems: CartItem[] = []; // Cart items to display
  @Input() total: number = 0; // Total price of the cart

  // Outputs for user actions
  @Output() close = new EventEmitter<void>(); // Emits when the dialog is closed
  @Output() removeItem = new EventEmitter<number>(); // Emits when an item is removed
  @Output() updateQuantity = new EventEmitter<{
    id: number;
    quantity: number;
  }>(); // Emits when item quantity is updated
  @Output() clearCart = new EventEmitter<void>(); // Emits when the cart is cleared

  constructor(public cartService: CartService) {}

  // Closes the dialog
  closeDialog(): void {
    this.close.emit();
    this.selectedImage = '';
  }

  // Updates the quantity of a cart item
  onUpdateQuantity(productId: number, quantity: number): void {
    this.updateQuantity.emit({ id: productId, quantity });
  }

  onRemoveItem(productId: number): void {
    this.removeItem.emit(productId);
  }

  onClearCart(): void {
    this.clearCart.emit();
  }

  onImageClick(image: string) {
    this.selectedImage = image;
  }
}
