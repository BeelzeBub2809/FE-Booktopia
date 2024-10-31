const userId = JSON.parse(localStorage.getItem('userId'));
const getOrderHistoryByUserId = async () => {
    try {
        let response = await fetch(`http://localhost:9999/api/order/user/${userId}`, {
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
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getAllOrder = async () => {
    try {
        let response = await fetch(`http://localhost:9999/api/order`, {
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
        return res.data;
    } catch (error) {
        throw error;
    }
};

const confirmOrder = async (orderId) => {
    try {
        let response = await fetch(`http://localhost:9999/api/order/confirm/${orderId}`, {
            method: 'POST',
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
        return res.data;
    } catch (error) {
        throw error;
    }
};

const cancelOnConfirmOrder = async (orderId) => {
    try {
        let response = await fetch(`http://localhost:9999/api/order/confirm-cancel/${orderId}`, {
            method: 'POST',
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
        return res.data;
    } catch (error) {
        throw error;
    }
}

const cancelOrder = async (orderId) => {
    try {
        let response = await fetch(`http://localhost:9999/api/order/cancel/${orderId}`, {
            method: 'POST',
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
        return res.data;
    } catch (error) {
        throw error;
    }
}
const OrderServices = {
    getOrderHistoryByUserId, getAllOrder, confirmOrder, cancelOnConfirmOrder, cancelOrder
}

export default OrderServices;