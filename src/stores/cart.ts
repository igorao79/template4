import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, Car } from '@/types';

interface CartState {
  cart: Cart;
  addToCart: (car: Car, quantity?: number, options?: CartItem['options']) => void;
  removeFromCart: (carId: string) => void;
  updateQuantity: (carId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (carId: string) => boolean;
  getCartItemsCount: () => number;
  calculateTotals: () => void;
}

const TAX_RATE = 0.08; // 8% налог
const DISCOUNT_THRESHOLD = 50000; // скидка при покупке на сумму свыше 50000

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        total: 0,
        discount: 0,
        tax: 0,
        grandTotal: 0,
      },

      addToCart: (car: Car, quantity = 1, options = {}) => {
        const { cart } = get();
        const existingItemIndex = cart.items.findIndex(
          (item) => item.car.id === car.id
        );

        if (existingItemIndex !== -1) {
          // Обновляем количество существующего товара
          const updatedItems = [...cart.items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({
            cart: {
              ...cart,
              items: updatedItems,
            },
          });
        } else {
          // Добавляем новый товар
          set({
            cart: {
              ...cart,
              items: [...cart.items, { car, quantity, options }],
            },
          });
        }

        get().calculateTotals();
      },

      removeFromCart: (carId: string) => {
        const { cart } = get();
        const updatedItems = cart.items.filter(
          (item) => item.car.id !== carId
        );
        set({
          cart: {
            ...cart,
            items: updatedItems,
          },
        });
        get().calculateTotals();
      },

      updateQuantity: (carId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(carId);
          return;
        }

        const { cart } = get();
        const updatedItems = cart.items.map((item) =>
          item.car.id === carId ? { ...item, quantity } : item
        );
        set({
          cart: {
            ...cart,
            items: updatedItems,
          },
        });
        get().calculateTotals();
      },

      clearCart: () => {
        set({
          cart: {
            items: [],
            total: 0,
            discount: 0,
            tax: 0,
            grandTotal: 0,
          },
        });
      },

      isInCart: (carId: string) => {
        const { cart } = get();
        return cart.items.some((item) => item.car.id === carId);
      },

      getCartItemsCount: () => {
        const { cart } = get();
        return cart.items.reduce((total, item) => total + item.quantity, 0);
      },

      calculateTotals: () => {
        const { cart } = get();
        const total = cart.items.reduce(
          (sum, item) => sum + item.car.price * item.quantity,
          0
        );

        // Скидка при покупке на большую сумму
        const discount = total > DISCOUNT_THRESHOLD ? total * 0.05 : 0;
        const discountedTotal = total - discount;
        
        // Налог
        const tax = discountedTotal * TAX_RATE;
        const grandTotal = discountedTotal + tax;

        set({
          cart: {
            ...cart,
            total,
            discount,
            tax,
            grandTotal,
          },
        });
      },
    }),
    {
      name: 'cart-storage', // имя в localStorage
      partialize: (state) => ({ cart: state.cart }),
    }
  )
); 