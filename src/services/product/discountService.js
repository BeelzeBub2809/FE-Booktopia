import { ROOT_DOMAIN } from "../../utils/config";

const getDiscount = async() => {
    try {
        let response = await fetch(`${ROOT_DOMAIN}/discount`, {
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
        return res;
    } catch (error) {
        throw error;
    }
}

const createDiscount = async (data) => {
  try {
   
      let response = await fetch(`${ROOT_DOMAIN}/discount`, {
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

const updateDiscount = async (data) => {
    try {
        let response = await fetch(`${ROOT_DOMAIN}/discount/${data._id}`, {
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

const DiscountService = {
    getDiscount, createDiscount, updateDiscount
};
export default DiscountService;