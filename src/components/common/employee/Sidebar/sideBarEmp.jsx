import './sideBarEmp.css';

function SideBarEmp() {
  const role = JSON.parse(localStorage.getItem("userRoles")) || [];

  const isMarketer = role.includes("marketer");
  const isAdmin = role.includes("admin");

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {isAdmin ? (
          // Only show the User menu item for admin
          <li className="nav-item">
            <a className="nav-link collapsed" href="/admin/user">
              <i className="bi bi-people"></i>
              <span>User</span>
            </a>
          </li>
        ) : isMarketer ? (
          // Only show the Review menu item for marketer
          <li className="nav-item">
            <a className="nav-link collapsed" href="/marketer/review">
              <i className="bi bi-bag-check"></i>
              <span>Review</span>
            </a>
          </li>
        ) : (
          // Default items for other roles
          <>
            <li className="nav-item">
              <a className="nav-link collapsed" href="/sale">
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
              <a className="nav-link collapsed" href="/sale/combo">
                <i className="bi bi-bag"></i>
                <span>Combo</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" href="/sale/discount">
                <i className="bi bi-nut"></i>
                <span>Discount</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" href="/sale/refund">
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
