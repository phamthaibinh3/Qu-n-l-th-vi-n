import "../App.css";
import { Data } from "../Context";
import Header from "../NhanVien/Header";
import TrangChuNv from "../NhanVien/TrangChuNv";
import TrangChuAd from "../Admin/TrangChuAd";
import { useState } from "react";
import { xemnhieu } from "../data/dataXemNhieu";
import { initalState } from "../context/initialState";
import reducer from "../context/reducer";
import { Route, Routes } from "react-router-dom";
import Create from "../Admin/Create";
import KhoNv from '../NhanVien/KhoNv'
import DemoDangNhap from "../DangNhap/DemoDangNhap";
import DocGia from '../DocGia/DocGia'
import SuaDocGia from "../DocGia/SuaDocGia";
import SuaSach from "./SuaSach";
import tailieu from "../data/datatailieumoi.json";
// import xemnhieunhat from "../data/xemnhieunhat.json";
import ThueSach from '../ThueSach/ThueSach'
import KhoSach from "../Admin/KhoSach";
import KhoSachKH from "../KhachHang/KhoSachKH";
import ChitietsachAd from "../Admin/ChitietsachAd";
import ChitietsachNv from "../NhanVien/ChitietsachNv";
import ChitietsachKH from "../KhachHang/ChitietsachKH";
import ChiTietSachMoiAd from "../Admin/ChiTietSachMoiAd";
import ChitietsachmoiNv from "../NhanVien/ChitietsachmoiNv";
import ChitietsachmoiKH from "../KhachHang/ChiTietSachMoiKH";
import ChiTietXemNhieuNhatNv from "../NhanVien/ChiTietXemNhieuNhatNv";
import ChiTietXemNhieuNhatAd from "../Admin/ChiTietXemNhieuNhatAd";
import ChiTietXemNhieuNhatKH from "../KhachHang/ChiTietXemNhieuNhatKH";
import DocGiaAdmin from "../DocGia/DocGiaAdmin";
import ThemNhanVien from "../Admin/ThemNhanVien";
import SuaNhanVien from "../Admin/SuaNhanVien";
import TaoTaiKhoan from "../DangNhap/TaoTaiKhoan";
import { IoPrism } from "react-icons/io5";
import TrangChuKH from "../KhachHang/TrangChuKH";
import Footer from "./Footer";


function App() {
  const [taiLieu, setTaiLieu] = useState(tailieu[0]);
  const [xemNhieu, setXemNhieu] = useState(xemnhieu[0]);
  // const [xemnhieunhat, setXemNhieuNhat] = useState(xemnhieunhat[0]);
  return (
    <div className="w-full h-auto flex flex-col ">
      <Data.Provider
        initialState={initalState}
        reducer={reducer}
        value={{ xemnhieu, xemNhieu, tailieu, taiLieu, setTaiLieu ,setXemNhieu }}
      >
        {/* <Header /> */}
        {/* className="mt-16 md:mt-24 w-full" */}
        <main >
          <Routes>
            <Route path="/" element={<DemoDangNhap />} />
            <Route path="/trangchunv" element={<TrangChuNv />} />
            <Route path="/trangchuad" element={<TrangChuAd />} />
            <Route path="/trangchukh" element={<TrangChuKH />} />
            <Route path="/createItem" element={<Create />} />
            <Route path="/kho" element={<KhoNv />} />
            <Route path="/khokh" element={<KhoSachKH />} />
            <Route path="/admin/khosach" element={<KhoSach />} />
            <Route path="/docgia" element={<DocGia />} />
            <Route path="/docgiaadmin" element={<DocGiaAdmin />} />
            <Route path="/themnv" element={<ThemNhanVien />} />
            <Route path="/suadocgia/:id" element={<SuaDocGia />} />
            <Route path="/suasach/:id" element={<SuaSach />} />
            <Route path="/chitietad/:id" element={<ChitietsachAd />} />
            <Route path="/chitietnv/:id" element={<ChitietsachNv />} />
            <Route path="/chitietkh/:id" element={<ChitietsachKH />} />
            <Route path="/chitietmoiad/:id" element={<ChiTietSachMoiAd />} />
            <Route path="/chitietmoinv/:id" element={<ChitietsachmoiNv />} />
            <Route path="/chitietmoikh/:id" element={<ChitietsachmoiKH />} />
            <Route path="/chitietxemnhieunv/:id" element={<ChiTietXemNhieuNhatNv />} />
            <Route path="/chitietxemnhieuad/:id" element={<ChiTietXemNhieuNhatAd />} />
            <Route path="/chitietxemnhieukh/:id" element={<ChiTietXemNhieuNhatKH />} />
            <Route path="/thueSach" element={<ThueSach />} />
            <Route path="/admin/taotaikhoan" element={<TaoTaiKhoan />} />
            <Route path="/admin/suanguoidung/:id" element={<SuaNhanVien />} />
            
          </Routes>
          
        </main>
        {/* <Nav/>   */}
        {/* <KhoSach/> */}
        
      </Data.Provider>
      
    </div>
  );
}

export default App;
