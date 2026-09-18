import { createContext, useReducer } from 'react';

const initialState = {
  cart: [],
};

function findCartItemIndex(cart, productId, size, color) {
  return cart.findIndex(
    (item) =>
      item.product.id === productId &&
      item.selectedSize === size &&
      item.selectedColor === color
  );
}

function productReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, selectedSize, selectedColor, quantity } = action.payload;

      const existingIndex = findCartItemIndex(
        state.cart,
        product.id,
        selectedSize,
        selectedColor
      );

      if (existingIndex !== -1) {
        const updatedCart = state.cart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return { ...state, cart: updatedCart };
      }

      const newItem = {
        id: `${product.id}-${selectedSize ?? 'no-size'}-${selectedColor ?? 'no-color'}`,
        product,
        selectedSize,
        selectedColor,
        quantity,
      };

      return { ...state, cart: [...state.cart, newItem] };
    }

    case 'REMOVE_FROM_CART': {
      const { cartItemId } = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== cartItemId),
      };
    }

    case 'UPDATE_CART_QUANTITY': {
      const { cartItemId, quantity } = action.payload;
      const safeQuantity = Math.max(1, quantity);

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: safeQuantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
}

const ProductContext = createContext(undefined);

function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider, productReducer };