import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import logo from '../assets/logo-metrika.png'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <ScrollManager />
      <header className="header">
        <Link className="brand" to="/" aria-label="Métrika, inicio">
          <img src={logo} alt="Métrika" />
        </Link>
        <nav className="nav" aria-label="Principal">
          <NavLink to="/" end>
            Quiénes somos
          </NavLink>
          <Link to="/#servicios">Servicios</Link>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>
      </header>
      <main key={pathname} className="page-in">
        <Outlet />
      </main>
      <footer className="footer">
        <img src={logo} alt="Métrika" />
      </footer>
    </>
  )
}
