import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResPage = () => {
  const resId = useParams();
  const [restaurantProfile, setRestaurantProfile] = useState(null);
  const [showMenu, setShowMenu] = useState([]);
  useEffect(() => {
    getRestaurantInfo();
  }, []);
  const getRestaurantInfo = async () => {
    const url = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.9124336&lng=75.7872709&restaurantId=${resId?.id}&catalog_qa=undefined&submitAction=ENTER`
    );
    const data = await url.json();
    setRestaurantProfile(data?.data);
    setShowMenu(
      new Array(
        data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.length
      ).fill(true)
    );

    console.log(showMenu);
  };
  const toggleMenu = (index) => {
    // Create a copy of the showMenuStates array
    const newShowMenuStates = [...showMenu];

    // Toggle the value for the clicked item
    newShowMenuStates[index] = !newShowMenuStates[index];

    // Update the state
    setShowMenu(newShowMenuStates);
  };
  return (
    <div className="w-8/12 m-auto min-h-[90vh] p-4 pt-24">
      {restaurantProfile && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-[0.6rem] text-gray-400 font-semibold">
            <div className="flex gap-1 items-center font-medium">
              <span>Home</span> <span>/</span>
              <span>
                {restaurantProfile?.cards[0]?.card?.card?.info?.city}
              </span>{" "}
              <span>/</span>
              <span className="text-gray-800">
                {restaurantProfile?.cards[0]?.card?.card?.info?.name}
              </span>
            </div>
            <i className="fa-solid fa-magnifying-glass text-lg text-gray-600"></i>
          </div>
          <div className="flex justify-between px-2 py-4 border-b border-dashed">
            <div className="flex flex-col text-xs text-gray-500 gap-1">
              <span className="text-2xl font-extrabold text-gray-700 mb-1">
                {restaurantProfile?.cards[0]?.card?.card?.info?.name}
              </span>
              <span>
                {restaurantProfile?.cards[0]?.card?.card?.info?.cuisines?.join(
                  " , "
                )}
              </span>
              <div className="flex items-center gap-2">
                <span>
                  {" "}
                  {restaurantProfile?.cards[0]?.card?.card?.info?.locality +
                    "  , "}
                </span>
                <span>
                  {" "}
                  {
                    restaurantProfile?.cards[0]?.card?.card?.info?.sla
                      ?.lastMileTravelString
                  }
                </span>
              </div>
            </div>
            <div className="flex flex-col text-xs border rounded-md p-2 justify-evenly items-center">
              <div className="flex items-center gap-1 font-extrabold text-green-600">
                <i className="fa-solid fa-star"></i>
                <span>
                  {restaurantProfile?.cards[0]?.card?.card?.info?.avgRating}
                </span>
              </div>
              <span className="p-[0.5px] w-full bg-gray-100"></span>
              <span className="text-gray-400">
                {
                  restaurantProfile?.cards[0]?.card?.card?.info
                    ?.totalRatingsString
                }
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs mx-2">
            <img
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_18,h_18/v1648635511/Delivery_fee_new_cjxumu"
              }
              alt=""
            />
            <span>2 Kms | &#8377;28 Delivery fee will apply</span>
          </div>
          <div className="flex gap-2 items-center font-extrabold px-2 py-4 text-gray-800">
            <svg
              className="RestaurantTimeCost_icon__8UdT4"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <circle
                r="8.35"
                transform="matrix(-1 0 0 1 9 9)"
                stroke="#3E4152"
                strokeWidth="1.3"
              ></circle>
              <path
                d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z"
                fill="#3E4152"
              ></path>
            </svg>
            <span className="mr-3">
              {restaurantProfile?.cards[0]?.card?.card?.info?.sla?.slaString
                ? restaurantProfile?.cards[0]?.card?.card?.info?.sla?.slaString
                : "20-25 MINS"}
            </span>
            <svg
              className="RestaurantTimeCost_icon__8UdT4"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <circle
                cx="9"
                cy="9"
                r="8.25"
                stroke="#3E4152"
                strokeWidth="1.5"
              ></circle>
              <path
                d="M12.8748 4.495H5.6748V6.04H7.9698C8.7948 6.04 9.4248 6.43 9.6198 7.12H5.6748V8.125H9.6048C9.3798 8.8 8.7648 9.22 7.9698 9.22H5.6748V10.765H7.3098L9.5298 14.5H11.5548L9.1098 10.57C10.2048 10.39 11.2698 9.58 11.4498 8.125H12.8748V7.12H11.4348C11.3148 6.475 10.9698 5.905 10.4298 5.5H12.8748V4.495Z"
                fill="#3E4152"
              ></path>
            </svg>
            <span>
              {restaurantProfile?.cards[0]?.card?.card?.info?.costForTwoMessage}
            </span>
          </div>
          <div className="flex gap-3 items-center w-full hide_scroll overflow-x-scroll  border-b border-dotted pb-8 pt-4">
            {restaurantProfile?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
              (item, i) => {
                return (
                  <div
                    className="flex border rounded-md p-2 text-[0.6rem] h-16 items-center font-semibold  "
                    key={i}
                  >
                    {item?.info?.offerTag && (
                      <span className="rotate-[270deg] h-6 border-b whitespace-nowrap text-red-500">
                        {item?.info?.offerTag}
                      </span>
                    )}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        {/* <img src={offerImg} alt="offer" className="h-4" /> */}
                        <img
                          src={
                            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/" +
                            item?.info?.offerLogo
                          }
                          alt="offer"
                          className="h-4"
                        />
                        <span className="text-xs text-gray-500">
                          {item?.info?.header}
                        </span>
                      </div>
                      <div className="text-gray-400 flex gap-1 text-xs whitespace-nowrap">
                        <span>{item?.info?.couponCode}</span>
                        <span>|</span>
                        <span>{item?.info?.description}</span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className="flex flex-col gap-3 py-3">
            {restaurantProfile?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(
              (item, i) => {
                return (
                  <>
                    {item?.card?.card?.itemCards?.length > 0 && (
                      <ul className="flex flex-col gap-4 " key={i}>
                        <div
                          className="flex w-full justify-between items-center my-2 cursor-pointer"
                          onClick={() => {
                            toggleMenu(i);
                          }}
                        >
                          <span className="font-extrabold">
                            {item?.card?.card?.title} (
                            {item?.card?.card?.itemCards?.length})
                          </span>
                          {showMenu[i] ? (
                            <i className="fa-solid fa-chevron-down"></i>
                          ) : (
                            <i className="fa-solid fa-chevron-up"></i>
                          )}
                        </div>
                        {showMenu[i] &&
                          item?.card?.card?.itemCards?.map((food, i) => {
                            return (
                              <li
                                className="flex justify-between py-4 border-b border-dotted"
                                key={i}
                              >
                                <div className="flex flex-col gap-1">
                                  {food?.card?.info?.itemAttribute
                                    ?.vegClassifier === "VEG" && (
                                    <div className="w-4 mb-1 h-4 flex justify-center items-center border-2 border-green-700">
                                      <span className="bg-green-700 rounded-full h-2 w-2"></span>
                                    </div>
                                  )}
                                  <span className="text-sm text-gray-400">
                                    {food?.card?.info?.name}
                                  </span>
                                  {food?.card?.info?.price && (
                                    <span className="text-sm text-gray-400">
                                      &#8377; {food?.card?.info?.price / 100}
                                    </span>
                                  )}
                                </div>
                                {food?.card?.info?.imageId && <img
                                  src={
                                    `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fit/` +
                                    food?.card?.info?.imageId
                                  }
                                  alt="food img"
                                  className="h-28 w-32 rounded-md bg-cover"
                                />}
                              </li>
                            );
                          })}
                      </ul>
                    )}
                  </>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResPage;
