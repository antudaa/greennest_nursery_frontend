import { Layout } from "antd";
import { Link } from "react-router-dom";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const { Footer } = Layout;

const FooterSection = () => {

    return (
        <Footer className="relative bg-blueGray-200 pt-8 pb-6">
            <hr className="mb-10 text-[#524434]" />
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-6/12 px-4">
                        <h4 className="text-3xl font-semibold text-blueGray-700">Let's keep in touch!</h4>
                        <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                            Find me on any of these platforms, Thank you for being with us.
                        </h5>

                        <div className="flex my-6">
                            <ul className="flex space-x-2">
                                <li className="transition transform duration-300 ease-in-out hover:scale-110 hover:text-blue-500 hover:bg-blue-100 text-blue-500 border-2 border-blue-500 rounded-full p-2 cursor-pointer">
                                    <FaFacebook />
                                </li>
                                <li className="transition transform duration-300 ease-in-out hover:scale-110 hover:text-indigo-500 hover:bg-indigo-100 text-indigo-500 border-2 border-indigo-500 rounded-full p-2 cursor-pointer">
                                    <FaGithub />
                                </li>
                                <li className="transition transform duration-300 ease-in-out hover:scale-110 hover:text-blue-600 hover:bg-blue-200 text-blue-600 border-2 border-blue-600 rounded-full p-2 cursor-pointer">
                                    <FaLinkedinIn />
                                </li>
                                <li className="transition transform duration-300 ease-in-out hover:scale-110 hover:text-green-500 hover:bg-green-100 text-green-500 border-2 border-green-500 rounded-full p-2 cursor-pointer">
                                    <FaWhatsapp />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="flex flex-wrap items-top mb-6">
                            <div className="w-full lg:w-4/12 px-4 ml-auto">
                                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <Link className="hover:text-green-500" to={`/products`}>Products</Link>
                                    </li>
                                    <li>
                                        <Link className="hover:text-green-500" to={`/cart-details`}>Cart</Link>
                                    </li>
                                    <li>
                                        <Link className="hover:text-green-500" to={`/manage-products`}>Manage Products</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-blueGray-300" /><Footer className="text-[#524434] text-center" style={{ textAlign: 'center' }}>
                    GreenNest Nursery ©{new Date().getFullYear()} Created by Antu_Das
                </Footer>
            </div>
        </Footer>
    );
};

export default FooterSection;