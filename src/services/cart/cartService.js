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

const addToCart = async ({ productId }) => {
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


const addComboToCart = async ({ comboId }) => {
    try {
        const addInfo = {
            comboId: comboId,
            quantity: 1,
        };
        let response = await fetch(`http://localhost:9999/api/cart/${userId}/add_combo_to_cart`, {
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

const removeFromCart = async (productId, comboId) => {
    try {
        console.log(productId, comboId);
        let addInfo
        if (productId) {
            addInfo = {
                productId: productId,
                quantity: 0,
            };
        } else {
            addInfo = {
                comboId: comboId,
                quantity: 0,
            };
        }

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

const changeQuantity = async ({ productId, quantity, comboId }) => {
    try {
        let addInfo
        if (productId) {
            addInfo = {
                productId: productId,
                quantity: quantity,
            };
        } else {
            addInfo = {
                comboId: comboId,
                quantity: quantity,
            };
        }
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
    getCart, addToCart, removeFromCart, changeQuantity, addComboToCart
};
export default CartService;