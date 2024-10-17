import React from "react";
import { ProductCard } from "../../../features/customer/Index/index"; // Import component ProductCard
import Lottie from "react-lottie"; // Nếu bạn muốn giữ phần Lottie animation
import LoadingLottie from "../../../../Assets/Lottie/loading-0.json"; // Nếu bạn muốn giữ phần Lottie animation
import { Link } from "react-router-dom";

function NewArrivals() {

  const loadingObj = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  // Bỏ việc sử dụng context, thay vào đó là 4 thẻ ProductCard tĩnh
  return (
    <div className="new-arrivals-container">
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </div>
  );
}

export { NewArrivals };
