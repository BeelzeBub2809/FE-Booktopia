const getStockInTotal = async (reportType) => {
  try {
    let response = await fetch(`http://localhost:9999/api/report/stock-in-total`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reportType }),
      credentials: 'include',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }
    const res = await response.json();
    return res.data;
  } catch (error) {
    throw error
  }
}

const getStockOutTotal = async (reportType) => {
  try {
    let response = await fetch(`http://localhost:9999/api/report/stock-out-total`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reportType }),
      credentials: 'include',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }
    const res = await response.json();
    return res.data;
  } catch (error) {
    throw error
  }
}

const getProfit = async (reportType) => {
  try {
    let response = await fetch(`http://localhost:9999/api/report/profit-total`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reportType }),
      credentials: 'include',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }
    const res = await response.json();
    return res.data;
  } catch (error) {
    throw error
  }
}

const SaleDashboardServices = {
  getStockInTotal, getStockOutTotal, getProfit
};

export default SaleDashboardServices;