import React, { useContext, useEffect, useState } from "react";
import demen from "../img/demenphieuluuky.jpg";
import { Data } from "../Context";
import { Link } from "react-router-dom";

export default function TaiLieuMoiNhatNv() {
  const { tailieu } = useContext(Data);

 
  return (
    <div className="mt-10 grid grid-cols-6 gap-4">
    {tailieu.map((data, index) => (
      <Link key={index} to={`/chitietmoinv/${index}`} className="">
        <img className="h-[200px] w-[150px] mb-3" src={data.links.images[0].url} alt="" />
        <span className="text-xl font-bold">{data.name} </span>
      </Link>
    ))}
  </div>
  );
}
