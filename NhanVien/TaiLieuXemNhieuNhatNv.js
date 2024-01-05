import React, { useContext, useEffect, useState } from "react";
import demen from "../img/demenphieuluuky.jpg";
import { Data } from "../Context";
import { Link } from "react-router-dom";

export default function TaiLieuXemNhieuNhatNv() {
  const { xemnhieu } = useContext(Data);
  return (
    <div className="mt-10 grid grid-cols-6 gap-4">
      {xemnhieu.map((item) => (
        <Link key={item.id} to={`/chitietxemnhieunv/${item.id}`} className="">
          <img className="h-[200px] w-[150px] mb-3" src={item.hinh} alt={item.name} />
          <span className="text-xl font-bold">{item.name}</span>
        </Link>
    ))}
  </div>
  );
}
