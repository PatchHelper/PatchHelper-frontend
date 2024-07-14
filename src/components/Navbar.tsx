import React, {useState} from "react";
import { Link } from "react-router-dom";

import { Menu, CloseMenu, SearchIcon } from "../img";
import { navMainAppLinks } from "../constants";
import { isLoggedIn } from "../utils/auth";

const Navbar: React.FC = () => {
    const [toggle, setToggle] = useState(false);
    const userState = isLoggedIn()? "logged_in" : "logged_out";

    return (
        <nav className='flex justify-between items-middle bg-background2 px-8 md:px-[11.25%] pt-12 pb-8 md:py-4'>
            <div className='flex max-h-[44px] gap-x-2'>
                {/* TODO: Insert logotype here later */}
                <Link to="/"className='semiboldheader3 justify-items-center self-center text-text'>Patch<span className='text-clr_primary'>Helper</span></Link>
            </div>

            <div className="hidden lg:flex flex-row items-start align-middle gap-x-24">
                <ul className='flex items-start gap-x-6 justify-center self-center text-text'>
                    {navMainAppLinks.main_links.map((link) => (
                        <li 
                        key={link.id}
                        className='cursor-pointer semiboldheader4 transition duration-250 hover:opacity-75'>
                            <Link to={`/${link.id}`}>
                                {link.label==="Search"? <img src={SearchIcon} alt="SearchIcon"/> : link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className='flex items-start gap-x-6 justify-center self-center text-text'>
                    {navMainAppLinks.user_links[userState].map((link) => (
                        <li 
                        key={link.id}
                        className='cursor-pointer semiboldheader4 transition duration-250 hover:opacity-75'>
                            <Link to={`/${link.id}`}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='flex lg:hidden bottom-8 top-12 justify-end items-center align-middle'>
                <img
                  src={toggle ? CloseMenu : Menu}
                  alt='MenuIcon'
                  className='w-[28px] h-[28px] object-contain cursor-pointer'
                  onClick={() => setToggle((prev) => !prev)}
                />

                <div className={`${toggle ? 'flex': 'hidden'} flex-col p-4 absolute top-20 right-0 mx-4 my-4 gap-y-4 min-w-[140px] sidebar bg-clr_secondary rounded-xl`}>
                    <ul className='list-none flex flex-col flex-1 justify-end items-start'>
                        {navMainAppLinks.main_links.map((link) => (
                            <li 
                              key={link.id}
                              className='cursor-pointer semiboldheader4 transition duration-250 hover:opacity-75'>
                                <Link to={`/${link.id}`} className='text-text'>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className='list-none flex flex-col flex-1 justify-end items-start'>
                        {navMainAppLinks.user_links[userState].map((link) => (
                            <li 
                              key={link.id}
                              className='cursor-pointer semiboldheader4 transition duration-250 hover:opacity-75'>
                                <Link to={`/${link.id}`} className='text-text'>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;