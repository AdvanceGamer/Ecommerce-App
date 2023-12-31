import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import SearchInput from '../Forms/SearchInput'
import useCategory from "../../hooks/useCategory";
import { useCart } from '../../context/Cart';
import { Badge } from 'antd'
const Header = () => {
  const [cart] = useCart();
  const categories = useCategory();
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate();
  const handleLogout = () => {

    toast.success("Logout Successfully", {
      autoClose: 1000,
      onClose: () => {
        setAuth({
          ...auth,
          user: null,
          token: ''
        });
        localStorage.removeItem('auth');
        navigate('/login');
      }
    });
    // navigate('/register');
    // navigate('/cart');
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" > 🛒 ClickMartio</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link homeButton" >Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle categoriesButton"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {
                !auth?.user ? (<>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link registerButton" >register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link loginButton">login</NavLink>
                  </li>
                </>) :

                  (<>
                    <li className="nav-item dropdown">
                      <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ border: "none" }}>
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item" >Dashboard</NavLink></li>

                        <li >
                          <NavLink onClick={handleLogout} className="dropdown-item" >logout</NavLink>
                        </li>
                      </ul>
                    </li>


                  </>)
              }
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link cartButton">
                  <Badge className="cartButton" count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header;