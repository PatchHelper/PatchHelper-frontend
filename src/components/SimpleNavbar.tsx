import React, { useState }from 'react';

import { navLandingPageLinks } from '../constants';
import { Menu, CloseMenu } from '../img';

const SimpleNavbar: React.FC = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <nav className='flex justify-between items-middle bg-background2 px-8 md:px-[11.25%] pt-12 pb-8 md:py-4'>
            <div className='flex max-h-[44px] gap-x-2'>
                {/* TODO: Insert logotype here later */}
                <p className='semiboldheader3 justify-items-center self-center text-text'>Patch<span className='text-clr_primary'>Helper</span></p>
            </div>

            <ul className='hidden sm:flex items-start gap-x-20 justify-center self-center text-text'>
                {navLandingPageLinks.map((link) => (
                    <li 
                      key={link.id}
                      className='cursor-pointer semiboldheader4 transition duration-250 hover:opacity-75'>
                        <a href={`${link.id==='patches'? "" : "#"}${link.id}`}>
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className='flex sm:hidden bottom-8 top-12 justify-end items-center align-middle'>
                <img
                  src={toggle ? CloseMenu : Menu}
                  alt='MenuIcon'
                  className='w-[28px] h-[28px] object-contain cursor-pointer'
                  onClick={() => setToggle((prev) => !prev)}
                />

                <div className={`${toggle ? 'flex': 'hidden'} p-4 absolute top-20 right-0 mx-4 my-4 min-w-[140px] sidebar bg-clr_secondary rounded-xl`}>
                    <ul className='list-none flex flex-col flex-1 gap-y-2 justify-end items-start'>
                        {navLandingPageLinks.map((link) => (
                            <li 
                              key={link.id}
                              className='cursor-pointer semiboldheader4 transition duration-250 hover:opacity-75'>
                                <a href={`#${link.id}`} className='text-text'>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default SimpleNavbar;