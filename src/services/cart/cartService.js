const userId = JSON.parse(localStorage.getItem('userId'));
const getCart = async () => {
  try {
      let response = await fetch(`http://localhost:9999/api/cart/${userId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
      });
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Network response was not ok');
      }
      const res = await response.json();
      return res.data.cartDetail;
  } catch (error) {
      throw error;
  }
};

const addToCart = async ({productId}) => {
  try {
      const addInfo = {
          productId: productId,
          quantity: 1,
      };
      let response = await fetch(`http://localhost:9999/api/cart/${userId}/add_to_cart`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(addInfo),
          credentials: 'include',
      });
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Network response was not ok');
      }
      const res = await response.json();
      return res;
  } catch (error) {
      throw error;
  }
}

const removeFromCart = async (productId) => {
  try {
      const addInfo = {
          productId: productId,
          quantity: 0,
      };
      console.log(productId);
      
      let response = await fetch(`http://localhost:9999/api/cart/${userId}/update`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(addInfo),
          credentials: 'include',
      });
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Network response was not ok');
      }
      const res = await response.json();
      return res;
  } catch (error) {
      throw error;
  }
}

const CartService = {
  getCart, addToCart, removeFromCart
};
export default CartService;