import { ROOT_DOMAIN } from "../../utils/config";

const createProduct = async (data) => {
  try {
   
      let response = await fetch(`${ROOT_DOMAIN}/product`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
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

const updateProduct = async (data) => {
    try {
        let response = await fetch(`${ROOT_DOMAIN}/product/${data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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

const ProductService = {
    createProduct, updateProduct
};
export default ProductService;