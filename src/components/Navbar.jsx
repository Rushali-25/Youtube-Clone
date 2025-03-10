import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import { useUtils } from "../context/UtilsContext";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setIsSidebar, isSidebar, mobileShow, setMobileShow } = useUtils(); // ✅ Fixed context hook call
  const [searchbar, setSearchbar] = useState(false);

  useEffect(() => {
    console.log(isSidebar, mobileShow);
  }, [isSidebar, mobileShow]); // ✅ Added `mobileShow` to dependency array

  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleSidebar = () => {
    if (window.innerWidth <= 1280) {
      setIsSidebar(!isSidebar);
      setMobileShow(!mobileShow);
    } else {
      setIsSidebar(!isSidebar);
    }
  };

  if (searchbar) {
    return (
      <div className="flex justify-between fixed top-0 w-[100%] bg-white px-6 py-2 items-center z-50">
        <IoArrowBack
          className="text-2xl cursor-pointer"
          onClick={() => setSearchbar(searchbar)}
        />
        <div className="flex w-[35%] items-center">
          <div className="w-[100%] px-4 py-2 border-[1px] border-gray-400 rounded-l-full">
            <input
              type="text"
              placeholder="Search"
              className="outline-none w-full"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              value={searchQuery}
            />
          </div>
          <button
            className="px-4 py-2 border-[1px] border-gray-400 bg-gray-100 rounded-r-full"
            onClick={() => searchQueryHandler("searchButton")}
          >
            <CiSearch size={"24px"} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between fixed top-0 w-[100%] bg-white px-6 py-2 items-center z-50">
      <div className="flex items-center space-x-4">
        <AiOutlineMenu
          className="text-xl cursor-pointer"
          onClick={handleSidebar}
        />
        {/* ✅ Use public path for logo */}
        <img
          src="/logo.png"
          alt="Logo"
          className="w-28 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex w-[35%] items-center">
        <div className="w-[100%] px-4 py-2 border-[1px] border-gray-400 rounded-l-full">
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            value={searchQuery}
          />
        </div>
        <button
          className="px-4 py-2 border-[1px] border-gray-400 bg-gray-100 rounded-r-full"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <CiSearch size={"24px"} />
        </button>
      </div>
      <IoMdMic
        size={"42px"}
        className="ml-3 border border-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200"
      />
      <div className="flex space-x-5 items-center">
        <IoIosSearch
          className="text-2xl"
          onClick={() => setSearchbar(!searchbar)}
        />
        <RiVideoAddLine className="text-2xl" />
        <AiOutlineBell className="text-2xl" />
        {/* ✅ Use public path for profile */}
        <Avatar src="/profile.jpg" size="32" round={true} />
      </div>
    </div>
  );
}

export default Navbar;
