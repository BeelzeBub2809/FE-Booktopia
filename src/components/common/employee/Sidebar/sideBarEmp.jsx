import './sideBarEmp.css';
function SideBarEmp() {
  return (
    <aside id="sidebar" class="sidebar">

      <ul class="sidebar-nav" id="sidebar-nav">

        <li class="nav-item">
          <a class="nav-link collapsed" href="#">
            <i class="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link collapsed" href="/sale/product">
            <i class="bi bi-book"></i>
            <span>Product</span>
          </a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link collapsed" href="/sale/category">
            <i class="bi bi-bookmarks"></i>
            <span>Category</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link collapsed" href="pages-faq.html">
            <i class="bi bi-arrow-clockwise"></i>
            <span>Refund</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link collapsed" href="pages-contact.html">
            <i class="bi bi-bag-check"></i>
            <span>Order</span>
          </a>
        </li>
      </ul>
    </aside>
  )
}

export default SideBarEmp;