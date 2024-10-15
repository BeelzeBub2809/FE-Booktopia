import React from "react";
import { ProductCard } from "../../../features/customer/Index/index"; // Import component ProductCard
import Lottie from "react-lottie"; // Nếu bạn muốn giữ phần Lottie animation
import LoadingLottie from "../../../../Assets/Lottie/loading-0.json"; // Nếu bạn muốn giữ phần Lottie animation

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
      {/* Hiển thị 4 thẻ ProductCard với các dữ liệu mẫu */}
      <ProductCard
        productdetails={{
          _id: "1",
          bookName: "Book One",
          author: "Author One",
          originalPrice: 500,
          discountedPrice: 400,
          discountPercent: 20,
          imgSrc: "../../../../Assets/Images/Book_Covers/book1.jpg",
          imgAlt: "Book One Cover",
          badgeText: "New Arrival",
          outOfStock: false
        }}
      />
      <ProductCard
        productdetails={{
          _id: "2",
          bookName: "Book Two",
          author: "Author Two",
          originalPrice: 600,
          discountedPrice: 450,
          discountPercent: 25,
          imgSrc: "../../../../Assets/Images/Book_Covers/book2.jpg",
          imgAlt: "Book Two Cover",
          badgeText: "New Arrival",
          outOfStock: false
        }}
      />
      <ProductCard
        productdetails={{
          _id: "3",
          bookName: "Book Three",
          author: "Author Three",
          originalPrice: 700,
          discountedPrice: 550,
          discountPercent: 21,
          imgSrc: "../../../../Assets/Images/Book_Covers/book3.jpg",
          imgAlt: "Book Three Cover",
          badgeText: "New Arrival",
          outOfStock: true
        }}
      />
    </div>
  );
}

export { NewArrivals };
