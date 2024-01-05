import React from "react";
import banner from "../img/banner2.jpg";
import { CiSearch } from "react-icons/ci";
import Menu from "../Component/Menu";
import TaiLieuMoiNhatNv from "./TaiLieuMoiNhatNv";
import TaiLieuXemNhieuNhatNv from "./TaiLieuXemNhieuNhatNv";
import Header from './Header'
import Footer from "../Component/Footer";
export default function Header2() {
  return (
    <div>
      <Header/>
      <div className="w-full h-[320px]">
        <img src={banner} alt="" className="w-full h-full" />
        <h1 className="relative top-[-150px] text-center text-3xl text-blue-700 font-bold font-serif ">
          QUẢN LÝ THƯ VIỆN
        </h1>
      </div>

      <div className="relative top-[-25px]">
        <div className="searchForm flex items-center justify-center ">
          <div className="form-group">
            <div className="btn-group">
              <input
                type="text"
                className="form-control h-[50px]"
                name
                id
                placeholder="Nhập từ khóa"
                style={{ width: "800px" }}
              />
              {/* <CiSearch className='text-4xl text-pink-400 relative left-[-50px] mt-2 hover:cursor-pointer border-l-[1.5px] border-gray-300 ' /> */}
              <CiSearch className="float-right text-4xl text-pink-400 relative left-[-50px] mt-2 border-l-[1.5px] hover:cursor-pointer  border-gray-300" />
            </div>
          </div>
        </div>{" "}
        {/* end tìm kiếm  */}
      </div>
      <div>
        <Menu />
      </div>
      <div className="mb-[270px] h-80  w-full">
        <div className="flex flex-col w-full items-center justify-between">
          <p
            className="relative text-2xl text-headingColor font-semibold capitalize
          before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto"
          >
            Tài liệu mới nhất
          </p>
        </div>
        <div>
          <TaiLieuMoiNhatNv />
        </div>
      </div>
      <div className="h-80  w-full">
        <div className="flex flex-col w-full items-center justify-between">
          <p
            className="relative text-2xl text-headingColor font-semibold capitalize
          before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto"
          >
            Tài liệu xem nhiều nhất
          </p>
        </div>
        <div>
          <TaiLieuXemNhieuNhatNv />
        </div>
        <Footer/>
      </div>
    </div>
  );
}
