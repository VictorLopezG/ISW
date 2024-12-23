import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/navbar.css';
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/auth');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        if (!menuOpen) {
            removeActiveClass();
        } else {
            addActiveClass();
        }
        setMenuOpen(!menuOpen);
    };

    const removeActiveClass = () => {
        const activeLinks = document.querySelectorAll('.nav-menu ul li a.active');
        activeLinks.forEach(link => link.classList.remove('active'));
    };

    const addActiveClass = () => {
        const links = document.querySelectorAll('.nav-menu ul li a');
        links.forEach(link => {
            if (link.getAttribute('href') === location.pathname) {
                link.classList.add('active');
            }
        });
    };

    return (
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    <li>
                        <NavLink
                            to="/home"
                            onClick={() => {
                                setMenuOpen(false);
                                addActiveClass();
                            }}
                            activeClassName="active"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/menu"
                            onClick={() => {
                                setMenuOpen(false);
                                addActiveClass();
                            }}
                            activeClassName="active"
                        >
                            Menú del día
                        </NavLink>
                    </li>
                    {(userRole === 'administrador' || userRole === 'Administrador_local' || userRole === 'cajero' || userRole === 'mesero') && (
                        <li>
                            <NavLink
                                to="/homecaja"
                                onClick={() => {
                                    setMenuOpen(false);
                                    addActiveClass();
                                }}
                                activeClassName="active"
                            >
                                Comandas
                            </NavLink>
                        </li>)}
                        {(userRole === 'administrador' || userRole === 'Administrador_local' || userRole === 'cocinero') && (
                        <li>
                            <NavLink
                                to="/cocineria"
                                onClick={() => {
                                    setMenuOpen(false);
                                    addActiveClass();
                                }}
                                activeClassName="active"
                            >
                                Cocina
                            </NavLink>

                        </li>
                    )}
                    {(userRole === 'administrador' || userRole === 'Administrador_local') && (
                        <li>
                            <NavLink
                                to="/home_admin"
                                onClick={() => {
                                    setMenuOpen(false);
                                    addActiveClass();
                                }}
                                activeClassName="active"
                            >
                                Administrar
                            </NavLink>
                        </li>
                    )}
                     {(userRole === 'cocinero') && (
                        <li>
                            <NavLink
                                to="/Admin_local"
                                onClick={() => {
                                    setMenuOpen(false);
                                    addActiveClass();
                                }}
                                activeClassName="active"
                            >
                                Productos
                            </NavLink>
                        </li>)}
                    <li>
                        <NavLink
                            to="/auth"
                            onClick={() => {
                                logoutSubmit();
                                setMenuOpen(false);
                            }}
                            activeClassName="active"
                        >
                            Cerrar sesión
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;