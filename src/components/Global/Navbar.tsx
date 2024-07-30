import { useContext, useState } from "react";
import Logo from "../../assets/GreenNest_Nursery_Logo_Landscape1.png";
import Logo2 from "../../assets/GreenNest_Nursery_Logo_Landscape2.png";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { Avatar, Badge } from "antd";
import { CartContext } from "../../redux/context/cartContext";

const Navbar = () => {
    const cartContext = useContext(CartContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header>
            <nav className="flex justify-between px-4 lg:px-20 py-3 items-center bg-white">
                {/* Changing  */}
                <div className="flex"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Link to={'/'}>
                        <img className="h-14 cursor-pointer" src={isHovered ? Logo2 : Logo} alt="GreenNest Nursery Logo" />
                    </Link>
                </div>
                <div className="flex items-center">
                    <div className="hidden md:flex items-center border border-[#524434] p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pt-0.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input className="ml-2 outline-none bg-transparent" type="text" name="search" id="search" placeholder="Search..." />
                    </div>
                    <ul className="hidden md:flex items-center space-x-5 ml-6">
                        <NavLink to={'/'} className="font-normal font-serif text-[#524434] hover:cursor-pointer hover:text-green-500">Home</NavLink>
                        <NavLink to={'/products'} className="font-normal font-serif text-[#524434] hover:cursor-pointer hover:text-green-500">Products</NavLink>
                        <NavLink to={'/manage-products'} className="font-normal font-serif text-[#524434] hover:cursor-pointer hover:text-green-500">Manage Products</NavLink>
                        <NavLink to={'/cart-details'} >
                            <Badge size="small" count={cartContext ? cartContext.state.cart.length : 0}>
                                <Avatar shape="circle" icon={<ShoppingCartOutlined className="text-green-500" />} />
                            </Badge>
                        </NavLink>
                    </ul>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center ml-6">
                        <button className="mobile-menu-button" onClick={toggleMenu}>
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <div className={`mobile-menu ${menuOpen ? '' : 'hidden'} md:hidden bg-white`}>
                <NavLink to={'/'} className="block py-2 px-12 font-serif text-[#524434] text-sm hover:bg-gray-200 hover:text-green-500">Home</NavLink>
                <NavLink to={'/products'} className="block py-2 px-12 font-serif text-[#524434] text-sm hover:bg-gray-200 hover:text-green-500">Products</NavLink>
                <NavLink to={'/manage-products'} className="block py-2 px-12 font-serif text-[#524434] text-sm hover:bg-gray-200 hover:text-green-500">Manage Products</NavLink>
            </div>
        </header>
    );
};

export default Navbar;
