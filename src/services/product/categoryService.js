import { ROOT_DOMAIN } from "../../utils/config";

const createCategory = async (data) => {
    console.log(data);
    
  try {
   
      let response = await fetch(`${ROOT_DOMAIN}/category`, {
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

const updateCategory = async (data) => {
    try {
        let response = await fetch(`${ROOT_DOMAIN}/category/${data._id}`, {
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

const CategoryService = {
    createCategory, updateCategory
};
export default CategoryService;