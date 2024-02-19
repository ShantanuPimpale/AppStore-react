import React from "react";
import { Seven, Two, Three, Four } from "../assets";
import { BiSolidCopyAlt } from "react-icons/bi";
import {
    MdConfirmationNumber,
    MdLogout,
    MdPoll,
    MdSportsBasketball,
    MdSportsFootball,
} from "react-icons/md";
import { FaAward } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
    return (
        <div className="w-full  rounded-[40px] h-64 xl:h-96 bg-fourth overflow-hidden relative shadow-lg shadow-[rgba(0,0,0,0.6)]">
            {/* slider */}
            <Swiper
                spaceBetween={30}
                centeredSlides={false}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Slide image={Seven} />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide image={Two} />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide image={Three} />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide image={Four} />
                </SwiperSlide>
            </Swiper>
            <div className="absolute inset-0 flex items-end justify-end z-50">
                <div className="w-full h-auto px-8 py-4 backdrop-blur-md bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.9)]  relative  flex items-center justify-start gap-6 flex-wrap">
                    {/*  */}
                    <div className="flex items-center justify-center gap-2 group">
                        <div className="w-6 rounded-md h-6 bg-textSecondary  group-hover:bg-secondary flex items-center justify-center">
                            <MdConfirmationNumber className="text-heroPrimary " />
                        </div>
                        <p className="text-textSecondary text-sm group-hover:text-secondary">
                            Luck Numbers
                        </p>
                    </div>

                    {/*  */}
                    <div className="flex items-center justify-center gap-2 group">
                        <div className="w-6 rounded-md h-6 bg-primary  group-hover:bg-secondary flex items-center justify-center">
                            <MdSportsFootball className="text-heroPrimary " />
                        </div>
                        <p className="text-secondary text-sm group-hover:text-secondary">
                            Soccer
                        </p>
                    </div>

                    {/*  */}
                    <div className="flex items-center justify-center gap-2 group">
                        <div className="w-6 rounded-md h-6 bg-textSecondary  group-hover:bg-secondary flex items-center justify-center">
                            <FaAward className="text-heroPrimary " />
                        </div>
                        <p className="text-textSecondary text-sm group-hover:text-secondary">
                            Jacpot
                        </p>
                    </div>

                    {/*  */}
                    <div className="flex items-center justify-center gap-2 group">
                        <div className="w-6 rounded-md h-6 bg-textSecondary  group-hover:bg-secondary flex items-center justify-center">
                            <MdPoll className="text-heroPrimary " />
                        </div>
                        <p className="text-textSecondary text-sm group-hover:text-secondary">
                            Bet Games
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Slide = ({ image }) => {
    return (
        <div className="w-full h-full">
            <img src={image} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-transparent">
                <div className="w-full h-full flex flex-col items-start justify-start px-4 py-2 lg:px-8 lg:py-6  ">
                    <h1
                        className="text-xl lg:text-3xl font-bold text-white tracking-wide"
                        style={{ textShadow: "5px 5px 8px rgba(0,0,0,0.6)" }}
                    >
                        We give money for the{" "}
                        <span className="block">first registration!</span>
                    </h1>
                    <p className="mt-2 text-white">
                        <span className="text-secondary">Free $100!</span> Register and
                        enter a special code
                    </p>

                    <div className="mt-3 flex items-center justify-center gap-8">
                        <div className="px-4 py-2 rounded-full border-2 border-dashed border-secondary bg-bgGlobal flex items-center justify-center gap-2">
                            <BiSolidCopyAlt className="text-secondary" />
                            <p className="text-sm font-bold text-white">#FREE5</p>
                        </div>

                        <div className="bg-gradient-to-r from-heroPrimary to-heroSecondory rounded-full px-4 py-2 shadow-lg flex items-center justify-center gap-2">
                            <MdLogout className=" text-black" />
                            <p className="text-sm font-medium text-black">SignUp</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;