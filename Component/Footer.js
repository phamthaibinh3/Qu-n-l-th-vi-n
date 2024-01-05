import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { BiLogoGmail } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";


export default function Footer(props) {
    return (
        <footer className="w-auto footer text-center">
            <div className="container">
                <div className="row">
                    {/* Footer Location*/}
                    <div className="col-lg-4 mb-1 mb-lg-0">
                        <h4 className="text-uppercase mb-4">Library Offline</h4>
                        <p className="lead mb-0">
                            34 Nguyễn Thị Minh Khai
                            <br />
                            Hải Châu, Đà Nẵng
                        </p>
                    </div>
                    {/* Footer Social Icons*/}
                    <div className="col-lg-4 mb-1 mb-lg-0">
                        <h4 className="text-uppercase mb-4">Liên hệ hỗ trợ</h4>
                        <a className="btn btn-outline-light btn-social mx-1" href="#!"><FaFacebook  /></a>
                        <a className="btn btn-outline-light btn-social mx-1" href="#!"><SiZalo  /></a>
                        <a className="btn btn-outline-light btn-social mx-1" href="#!"><BiLogoGmail   /></a>
                        <a className="btn btn-outline-light btn-social mx-1" href="#!"><FaInstagram  /></a>
                    </div>
                    {/* Footer About Text*/}
                    <div className="col-lg-4">
                        <h4 className="text-uppercase mb-4">Mã số doanh nghiệp: 0106773786</h4>
                        <p className="lead mb-0">
                         Do Sở Kế hoạch & Đầu tư TP Đà Nẵng cấp lần đầu ngày 10/02/2015
                            <a href="http://startbootstrap.com">© 2015 - Bản quyền thuộc về Công ty TNHH Duy Tân</a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    )
}
