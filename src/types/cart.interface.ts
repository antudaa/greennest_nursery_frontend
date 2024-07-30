export interface CartItem {
  _id?: string;
  title?: string;
  description?: string;
  name?: string;
  price: number;
  quantity: number;
  cartQuantity: number;
  outOfStock?: boolean;
  isDeleted?: boolean;
  productImage: string;
  category: {
    _id: string;
    categoryName: string;
    categoryImage: string;
  };
}


export interface CartState {
  cart: CartItem[];
  total_item: number;
  total_amount: number;
  shipping_fee: number;
}

interface AddToCartAction {
  type: 'ADD_TO_CART';
  payload: {
    product: CartItem;
  };
}

interface UpdateQuantityAction {
  type: 'UPDATE_QUANTITY';
  payload: {
    id: string;
    quantity: number;
  };
}

interface RemoveFromCartAction {
  type: 'REMOVE_FROM_CART';
  payload: {
    id: string;
  };
}

export type CartAction = AddToCartAction | UpdateQuantityAction | RemoveFromCartAction;
