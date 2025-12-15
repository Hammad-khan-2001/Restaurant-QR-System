import React from 'react'

const Footer = () => {
    return (
        <div class="bg-[#0a0600] py-6 px-16 tracking-wide">
            <div class="flex justify-between items-center max-lg:flex-col text-center flex-wrap gap-4">
                <p class="text-slate-300 text-[15px] leading-loose">© Scanbite. All rights reserved.</p>

                <ul class="flex space-x-8 gap-y-3 max-lg:justify-center flex-wrap">
                    <li><a href="javascript:void(0)" class="text-[15px] text-slate-300 hover:text-white">Terms of Service</a></li>
                    <li><a href="javascript:void(0)" class="text-[15px] text-slate-300 hover:text-white">Privacy Policy</a></li>
                    <li><a href="javascript:void(0)" class="text-[15px] text-slate-300 hover:text-white">Contact</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer