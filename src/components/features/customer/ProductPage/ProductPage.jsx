import "./ProductPage.css";
import bookCover from '../../../../Assets/Images/Book_Covers/50_Shades_Of_Grey.jpg'; // Đảm bảo rằng đường dẫn này là chính xác.

function ProductPage() {
    // Dữ liệu tĩnh cho sản phẩm
    const imgSrc = bookCover; // Đường dẫn tới hình ảnh bìa sách
    const imgAlt = "Book Cover";
    const bookName = "The Alchemist";
    const author = "Paulo Coelho";
    const description = "A novel about a young shepherd named Santiago who travels from Spain to Egypt in search of treasure.";
    const rating = 4.7;
    const discountedPrice = 299;
    const originalPrice = 499;
    const discountPercent = 40;
    const outOfStock = false; // Bạn có thể thay đổi thành true nếu muốn kiểm tra trạng thái hết hàng

    return (
        <div className="product-page-container">
            <div className="product-page-item">
                <img className="bookcover-image" src={imgSrc} alt={imgAlt}></img>
                <div className="item-details">
                    <h2>{bookName}</h2>
                    <hr></hr>
                    <p><b>Author: </b> &nbsp;&nbsp; <span>{author}</span></p>
                    <p className="item-description"><b>Description: </b> &nbsp;&nbsp; <span>{description}</span></p>
                    <p className="item-rating"><b>Rating: </b> &nbsp;&nbsp; <span>{rating}</span></p>
                    <h3 className="item-price-details">
                        Rs. {discountedPrice} &nbsp;&nbsp;
                        <del>Rs. {originalPrice}</del> &nbsp;&nbsp;
                        <span className="discount-on-item">({discountPercent}% off)</span>
                    </h3>
                    {outOfStock === true && (
                        <p className="out-of-stock-text">Item is currently out of stock</p>
                    )}
                    <div className="item-buttons">
                        {outOfStock === true ? (
                            <button className="item-notify-me-btn solid-primary-btn">Notify Me</button>
                        ) : (
                            <>
                                <button className="solid-primary-btn">Add to wishlist</button>
                                <button className="solid-warning-btn">Add to cart</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { ProductPage };
