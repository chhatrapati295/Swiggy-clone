import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import loader from "../assets/coffee.gif";
import ResCard from "./ResCard";
import { Link } from "react-router-dom";

const Body = () => {
  const locData = useSelector((state) => state.loc.locData);
  const initLoc = useSelector((state) => state.loc.initLocData);
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [whatsMind, setWhatsMind] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  const scrollContainerRef = useRef(null);
  const scrollContainerRef2 = useRef(null);
  const scrollContainerRef3 = useRef(null);

  useEffect(() => {
    getMainData();
    console.log(locData);
  }, [locData]);

  const getMainData = async () => {
    setLoading(true);
    try {
      const mainUrl = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${
          locData ? locData[0]?.geometry?.location?.lat : "28.6"
        }&lng=${
          locData ? locData[0]?.geometry?.location?.lng : "77.2"
        }&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
      const resData = await mainUrl.json();
      setBannerData(
        resData?.data?.cards &&
          resData?.data?.cards[0]?.card?.card?.imageGridCards?.info
      );
      setWhatsMind(
        resData?.data?.cards &&
          resData?.data?.cards[1]?.card?.card?.imageGridCards?.info
      );
      setRestaurants(
        resData?.data?.cards 
      );
    } catch (error) {
      // Handle error, you can set an error state or display an error message
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + scrollOffset,
        behavior: "smooth", // Add smooth scrolling behavior
      });
    }
  };
  const handleScroll2 = (scrollOffset) => {
    if (scrollContainerRef2.current) {
      scrollContainerRef2.current.scrollTo({
        left: scrollContainerRef2.current.scrollLeft + scrollOffset,
        behavior: "smooth", // Add smooth scrolling behavior
      });
    }
  };
  const handleScroll3 = (scrollOffset) => {
    if (scrollContainerRef3.current) {
      scrollContainerRef3.current.scrollTo({
        left: scrollContainerRef3.current.scrollLeft + scrollOffset,
        behavior: "smooth", // Add smooth scrolling behavior
      });
    }
  };

  return (
    <div className="my-4 mx-6 flex  justify-center items-center flex-col gap-3 rounded-md w-[75%] mt-24 ">
      {bannerData && !loading && (
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between items-center gap-2">
            <h2 className="text-2xl font-semibold">Best offers for you</h2>
            {bannerData?.length > 3 && (
              <div className="flex items-center gap-2 mr-10">
                <button
                  className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out"
                  onClick={() => handleScroll(-600)}
                >
                  <i className="fa-solid fa-arrow-left text-gray-500"></i>
                </button>
                <button
                  className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out"
                  onClick={() => handleScroll(600)}
                >
                  <i className="fa-solid fa-arrow-right text-gray-500"></i>
                </button>
              </div>
            )}
          </div>
          <div
            className="flex w-full hide_scroll overflow-x-scroll scroll_bar gap-8 pb-4 ml-0 transition-all duration-75"
            ref={scrollContainerRef}
          >
            {bannerData?.map((item) => {
              return (
                <img
                  key={item?.id}
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.imageId}`}
                  alt="banner_image"
                  className="w-96 cursor-pointer"
                />
              );
            })}
          </div>
        </div>
      )}
      {loading && (
        <div className="flex flex-col gap-8 justify-center items-center bg-slate-800 rounded-lg text-white w-full min-h-[40vh]">
          <img src={loader} alt="loader" className="h-14 w-14 rounded-full" />
          <span className="text-2xl tracking-wider font-semibold ">
            Looking for great food near you ....
          </span>
        </div>
      )}
      {whatsMind && !loading && (
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between items-center gap-2">
            <h2 className="text-2xl font-semibold">What`s on your mind</h2>
            <div className="flex items-center gap-2 mr-10">
              <button
                className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out"
                onClick={() => handleScroll2(-600)}
              >
                <i className="fa-solid fa-arrow-left text-gray-500"></i>
              </button>
              <button
                className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out"
                onClick={() => handleScroll2(600)}
              >
                <i className="fa-solid fa-arrow-right text-gray-500"></i>
              </button>
            </div>
          </div>
          <div
            className="flex w-full hide_scroll overflow-x-scroll scroll_bar gap-8 pb-4 ml-0 transition-all duration-75"
            ref={scrollContainerRef2}
          >
            {whatsMind?.map((item) => {
              return (
                <img
                  key={item?.id}
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.imageId}`}
                  alt="banner_image"
                  className="w-36 cursor-pointer"
                />
              );
            })}
          </div>
        </div>
      )}
      {restaurants && (
        <div className="flex flex-col gap-8 w-full">
          <div className="flex justify-between items-center gap-2">
            {/* <h2 className="text-2xl font-[600]">
            Top restaurant chains in{" "}
            {locData ? locData[0]?.formatted_address?.split(", ")[0]?.trim() : initLoc?.city}
          </h2> */}
            <h2 className="text-2xl font-[600]">
              {restaurants[2]?.card?.card?.header ? restaurants[2]?.card?.card?.header?.title : initLoc?.city}
            </h2>
            <div className="flex items-center gap-2 mr-10">
              <button
                className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out"
                onClick={() => handleScroll3(-800)}
              >
                <i className="fa-solid fa-arrow-left text-gray-500"></i>
              </button>
              <button
                className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out"
                onClick={() => handleScroll3(800)}
              >
                <i className="fa-solid fa-arrow-right text-gray-500"></i>
              </button>
            </div>
          </div>
          <div
            className="flex hide_scroll overflow-x-auto w-full gap-10 sm_scroll"
            ref={scrollContainerRef3}
          >
            {restaurants[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map(
              (item, i) => {
                return <Link to={'/res/' + item?.info?.id} key={i}><ResCard resData={item?.info} /></Link>;
              }
            )}
          </div>
          <div className="m-auto w-48 h-4"></div>
        </div>
      )}
      {restaurants && <div className="flex flex-col gap-8 w-full">
        <div className="flex justify-between items-center gap-2">
          {/* <h2 className="text-2xl font-[600]">
            Top restaurant chains in{" "}
            {locData ? locData[0]?.formatted_address?.split(", ")[0]?.trim() : initLoc?.city}
          </h2> */}
          <h2 className="text-2xl font-[600]">
            {restaurants[3]?.card?.card?.title ? restaurants[3]?.card?.card?.title : initLoc?.city}
          </h2>
          <div className="flex items-center gap-2 mr-10">
            <button
              className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out"
              onClick={() => handleScroll3(-800)}
            >
              <i className="fa-solid fa-arrow-left text-gray-500"></i>
            </button>
            <button
              className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out"
              onClick={() => handleScroll3(800)}
            >
              <i className="fa-solid fa-arrow-right text-gray-500"></i>
            </button>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {restaurants[4]?.card?.card?.facetList?.map((item,i)=>{
            return <button key={i} value={item?.facetInfo && item?.facetInfo[0]?.id} onClick={(e)=>{
              console.log(e.target.value);
            }} className=" rounded-full px-4 py-1 text-gray-600 text-sm border">{item?.facetInfo && item?.facetInfo[0]?.label}</button>
          })}
        </div>
        {/* <div className="flex gap-2 items-center">
          {restaurants[4]?.card?.card?.facetList?.map((item,i)=>{
            return <div key={i} >{item?.facetInfo?.map((item , i)=>{
              return <button key={i} className=" rounded-full px-4 py-1 text-gray-600 text-sm border">{item?.label}</button>
            })}</div>
          })}
        </div> */}
        <div
          className="flex hide_scroll overflow-x-auto w-full gap-10 sm_scroll"
          ref={scrollContainerRef3}
        >
          {restaurants[5]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants?.map((item, i) => {
            // return <ResCard key={i} resData={item?.info} />;
            return <Link to={'/res/' + item?.info?.id} key={i}><ResCard key={i} resData={item?.info} /></Link>;
          })}
        </div>
        <div className="m-auto w-48 h-4"></div>
      </div>}
    </div>
  );
};

export default Body;
