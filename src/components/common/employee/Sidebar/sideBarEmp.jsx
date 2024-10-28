import './sideBarEmp.css';

function SideBarEmp() {
  const role = JSON.parse(localStorage.getItem("userRoles")); 

  const isMarketer = role.includes("marketer");

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {isMarketer ? (
          <li className="nav-item">
            <a className="nav-link collapsed" href="/marketer/review">
              <i className="bi bi-bag-check"></i>
              <span>Review</span>
            </a>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <a className="nav-link collapsed" href="#">
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" href="/sale/product">
                <i className="bi bi-book"></i>
                <span>Product</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" href="/sale/category">
                <i className="bi bi-bookmarks"></i>
                <span>Category</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" href="pages-faq.html">
                <i className="bi bi-arrow-clockwise"></i>
                <span>Refund</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" href="/sale/order">
                <i className="bi bi-bag-check"></i>
                <span>Order</span>
              </a>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default SideBarEmp;
