import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Chart, registerables } from 'chart.js';
import './dashboardSale.css';
import SaleDashboardServices from '../../../../services/dashboard/saleDashboard';
Chart.register(...registerables);

function DashboardSale() {
  const [stockInTotal, setStockInTotal] = React.useState(0);
  const [stockOutTotal, setStockOutTotal] = React.useState(0);
  const [totalRevenue, setTotalRevenue] = React.useState(0);

  const fetchData = async () => {
    try {
      const stockInTotal = await SaleDashboardServices.getStockInTotal('month');
      const stockOutTotal = await SaleDashboardServices.getStockOutTotal('month');
      const totalRevenue = await SaleDashboardServices.getProfit('month');

      setStockInTotal(stockInTotal);
      setStockOutTotal(stockOutTotal);
      setTotalRevenue(totalRevenue);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    let salesChartInstance, pieChartInstance;

    const salesCtx = document.getElementById("salesChart").getContext("2d");
    salesChartInstance = new Chart(salesCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
          label: "Monthly Sales",
          data: [totalRevenue, 0, 0, 0, 0, 0],
          borderColor: "rgb(13, 110, 253)",
          backgroundColor: "rgba(13, 110, 253, 0.1)",
          fill: true,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)"
            }
          },
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0.05)"
            }
          }
        }
      }
    });

    const pieCtx = document.getElementById("pieChart").getContext("2d");
    pieChartInstance = new Chart(pieCtx, {
      type: "doughnut",
      data: {
        labels: ["Online", "In-Store", "Phone"],
        datasets: [{
          data: [300, 150, 100],
          backgroundColor: [
            "rgba(13, 110, 253, 0.8)",
            "rgba(25, 135, 84, 0.8)",
            "rgba(255, 193, 7, 0.8)"
          ],
          borderColor: "#ffffff",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    });

    fetchData();

    // Cleanup function to destroy the chart instances on component unmount or re-render
    return () => {
      if (salesChartInstance) salesChartInstance.destroy();
      if (pieChartInstance) pieChartInstance.destroy();
    };
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={10} className="ms-sm-auto px-4 py-3">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-4 border-bottom">
            <h2 className="text-primary">Sales Overview</h2>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <Button variant="primary">
                  <i className="bi bi-file-pdf me-1"></i>Export PDF
                </Button>
                <Button variant="success">
                  <i className="bi bi-file-excel me-1"></i>Export CSV
                </Button>
              </div>
              <Button variant="outline-secondary" className="dropdown-toggle">
                <i className="bi bi-calendar3 me-1"></i>This week
              </Button>
            </div>
          </div>

          <Row className="g-4 mb-4">
            <Col xl={4} md={6}>
              <Card className="border-primary h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0 text-primary">Total Revenue</h6>
                      <h2 className="mb-0">{totalRevenue.$numberDecimal || totalRevenue || 0} VND</h2>
                    </div>
                    <i className="bi bi-currency-dollar fs-1 text-primary"></i>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={4} md={6}>
              <Card className="border-success h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0 text-success">Stock in total</h6>
                      <h2 className="mb-0">{stockInTotal.$numberDecimal || 0} VND</h2>
                    </div>
                    <i className="bi bi-cart-check fs-1 text-success"></i>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={4} md={6}>
              <Card className="border-warning h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0 text-warning">Stock out total</h6>
                      <h2 className="mb-0">{stockOutTotal.$numberDecimal || 0} VND</h2>
                    </div>
                    <i className="bi bi-graph-up fs-1 text-warning"></i>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="g-4 mb-4">
            <Col xl={8} lg={7}>
              <Card className="bg-white">
                <Card.Body>
                  <h5 className="card-title mb-4">Sales Analytics</h5>
                  <canvas id="salesChart" width="400" height="200"></canvas>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={4} lg={5}>
              <Card className="bg-white">
                <Card.Body>
                  <h5 className="card-title mb-4">Sales Distribution</h5>
                  <canvas id="pieChart" width="300" height="300"></canvas>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardSale;
