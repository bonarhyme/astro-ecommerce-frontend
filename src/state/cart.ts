import { atom } from 'nanostores';
import { getProductRequest } from './products';

export interface ICartItem {
  product: string;
  qty: number;
  name: string;
  image: string;
  price: number;
  countInStock: number;
}

export const loadingAddCart = atom<boolean>(false);
export const errorAddCart = atom<string | undefined>(undefined);

export const cart = atom<Array<ICartItem> | undefined>(undefined);

export const addToCart = async (id: string, qty: number) => {
  try {
    errorAddCart.set(undefined);
    loadingAddCart.set(true);

    // Get product first
    const productResponse = await getProductRequest(id, false);

    // Check if product is available and not less than requested quantity
    if ((productResponse?.countInStock || 0) < qty || !productResponse?.countInStock) {
      throw new Error('Few items remaining... Reduce quantity');
    }

    // Define cart items from state
    const cartItems = cart?.get() || [];

    // Get existing cart iytem
    const existingCartItem = cartItems?.find((item) => item.product === productResponse?._id);

    // Selected Cart item has been previously selected
    if (existingCartItem) {
      // Update the existing item's quantity
      const updatedCartItem = { ...existingCartItem, qty };

      // Update the list of cart items with the modified cart item
      const updatedCartItems = cartItems?.map((cartItem) =>
        cartItem?.product === existingCartItem.product ? updatedCartItem : cartItem
      );

      // save the changes to the state
      cart.set(updatedCartItems);
    }

    // Cart item is a new item
    if (!existingCartItem) {
      // Create a new cart item with data from server and also selected quantity
      const newCartItem: ICartItem = {
        product: productResponse?._id,
        image: productResponse?.image,
        name: productResponse?.name,
        price: productResponse?.price,
        qty,
        countInStock: productResponse?.countInStock,
      };

      // Update the list of cart items with the newly added cart items
      const updatedCartItems = [...cartItems, newCartItem];

      // Save the  Update to  the state
      cart.set(updatedCartItems);
    }
    localStorage.setItem('cart', JSON.stringify(cart?.get()));
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorAddCart.set(message);
  } finally {
    loadingAddCart.set(false);
  }
};

export const removeFromCart = async (id: string) => {
  try {
    // Define cart items from state
    const cartItems = cart?.get() || [];

    const updatedCartItem = cartItems?.filter((cartItem) => cartItem?.product !== id);
    cart.set(updatedCartItem);

    localStorage.setItem('cart', JSON.stringify(cart?.get()));
  } catch (error) {
    console.log({ RemoveFromCartError: error });
  } finally {
  }
};
