import React, { useContext, useEffect, useState } from "react";
import demen from "../img/demenphieuluuky.jpg";
import { Data } from "../Context";
import { Link } from "react-router-dom";

export default function TaiLieuMoiNhatAd() {
  const { tailieu } = useContext(Data);

 
  return (
    <div className="mt-10 grid grid-cols-6 gap-4">
    {tailieu.map((data, index) => (
      <Link key={index} to={`/chitietmoikh/${index}`} className="">
        <img className="h-[200px] w-[150px] mb-3" src={data.links.images[0].url} alt="" />
        <span className="text-xl font-bold">{data.name} </span>
      </Link>
    ))}
  </div>
  );
}

/**
 * {/* <section className="w-full my-3" id="menu">
        {tailieu.map((data, index) => (
              <div key = {index} className="mb-2 mt-10" >
                <div className="border-2 border-black ">
                  <img className="h-[200px] m-2" src={data.links.images[0].url} alt="" />
                  <span className=" m-2">Thiên thần nhỏ của tôi</span>
                </div>
            </div>
          ))}
        <div></div>
      </section> */
