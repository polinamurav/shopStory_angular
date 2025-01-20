import {Component, Input, OnInit} from '@angular/core';
import {FavoriteService} from "../../../shared/services/favorite.service";
import {FavoriteType} from "../../../../types/favorite.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environments/environment";
import {CartType} from "../../../../types/cart.type";
import {CartService} from "../../../shared/services/cart.service";
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  cart: CartType | null = null;
  count: number = 1;
  products: FavoriteType[] = [];
  serverStaticPath = environment.serverStaticPath;
  @Input() countInCart: number | undefined = 0;

  constructor(private favoriteService: FavoriteService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.favoriteService.getFavorites()
      .subscribe((data: FavoriteType[] | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          const error = (data as DefaultResponseType).message;
          throw new Error(error);
        }

        this.products = data as FavoriteType[];
      })

    this.cartService.getCart()
      .subscribe((cartData: CartType | DefaultResponseType) => {
        if ((cartData as DefaultResponseType).error !== undefined) {
          throw new Error((cartData as DefaultResponseType).message);
        }

        const cartDataResponse = cartData as CartType;

        this.products.forEach(product => {
          const cartItem = cartDataResponse.items.find(item => item.product.id === product.id);
          product.countInCart = cartItem ? cartItem.quantity : 0;
        });
      });
  }

  removeFromFavorites(id: string) {
    this.favoriteService.removeFavorite(id)
      .subscribe((data: DefaultResponseType) => {
        if (data.error) {
          //...
          throw new Error(data.message);
        }

        this.products = this.products.filter(item => item.id !== id);
      });
  }

  updateCount(productId: string, value: number): void {
    const product = this.products.find(item => item.id === productId);
    if (product) {
      product.countInCart = value;

      this.cartService.updateCart(product.id, product.countInCart)
        .subscribe((data: CartType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }

          // product.countInCart = data as CartType;
        });
    }
  }

  addToCart(productId: string): void {
    const product = this.products.find(item => item.id === productId);
    if (product) {
      this.cartService.updateCart(product.id, this.count)
        .subscribe((data: CartType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }

          this.countInCart = this.count;
        });
    }
  }
}
