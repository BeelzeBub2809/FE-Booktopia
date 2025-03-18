const createRefund = async (refundData) => {
  try {
    let response = await fetch(`http://localhost:9999/api/refund/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(refundData),
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

const getAllRefunds = async () => {
  try {
    let response = await fetch(`http://localhost:9999/api/refund`, {
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
}

const confirmRefund = async (refundId) => {
  try {
    let response = await fetch(`http://localhost:9999/api/refund/confirm/${refundId}`, {
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

const rejectRefund = async (refundId) => {
  try {
    let response = await fetch(`http://localhost:9999/api/refund/reject/${refundId}`, {
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

const restockRefund = async (refundId, orderId) => {
  try {
    let response = await fetch(`http://localhost:9999/api/refund/restock-refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refundId, orderId }),
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
const RefundService = {
  createRefund, getAllRefunds, confirmRefund, rejectRefund, restockRefund
};  
export default RefundService;