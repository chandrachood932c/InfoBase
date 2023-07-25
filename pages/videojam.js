import React from "react";

import { Navbar, Info } from "@/components";

const marketplace = () => {
  return (
    <div>
      <Navbar explore />

      <div>
        <div className='drawer drawer-mobile pt-[20px] nav-h'>
          <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />

          <div className='drawer-content flex flex-col p-[30px] pt-0 mt-[20px]'>
            <p className='text-[#c3073f] text-[37px] mb-[20px] font-medium'>
              Collaborate
            </p>

            <Info />
          </div>

          {/*<div className='drawer-side ml-[20px]'>
            <ul className='menu p-4 w-[250px] h-[600px] mt-[20px] rounded-[20px] bg-[#4e4e50] text-[#1a1a1d] font-medium'>
              <li>
                <a className='active:bg-transparent active:text-[#1a1a1d] hover:text-[#ff0033]'>
                  Market
                </a>
              </li>

              <li>
                <a className='active:bg-transparent active:text-[#1a1a1d] hover:text-[#ff0033]'>
                  Gated
                </a>
              </li>

              <li>
                <a className='active:bg-transparent active:text-[#1a1a1d] hover:text-[#ff0033]'>
                  Dashboard
                </a>
              </li>

              <li>
                <a className='active:bg-transparent active:text-[#1a1a1d] hover:text-[#ff0033]'>
                  Funding
                </a>
              </li>

              <li>
                <a className='active:bg-transparent active:text-[#1a1a1d] hover:text-[#ff0033]'>
                  Search
                </a>
              </li>
            </ul>
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default marketplace;
