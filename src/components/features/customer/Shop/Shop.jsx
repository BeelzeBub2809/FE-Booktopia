import React, { useEffect, useState } from "react";
import "./Shop.css";
import { Sidebar, ProductCard } from "../Index/index.js";

function Shop() {
    const [products, setProducts] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]); // State mới để lưu tác giả
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]); // State để lưu tác giả đã chọn
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(50000000);
    const [sortOrder, setSortOrder] = useState("price-low-to-high");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, genresResponse] = await Promise.all([
                    fetch("http://localhost:9999/api/product"),
                    fetch("http://localhost:9999/api/category")
                ]);
                if (!productsResponse.ok) throw new Error("Failed to fetch products.");
                if (!genresResponse.ok) throw new Error("Failed to fetch genres.");
                const productsData = await productsResponse.json();
                const genresData = await genresResponse.json();
                setProducts(productsData.data);
                setGenres(genresData.data);

                const authorsData = productsData.data
                    .filter(product => product.type === "single") // Lọc sản phẩm có type là "single"
                    .map(product => product.author) // Lấy author từ các sản phẩm đã lọc
                    .flat(); // Làm phẳng mảng nếu author là một mảng

                setAuthors([...new Set(authorsData)]); // Loại bỏ các author trùng lặp
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleGenreChange = (genreId) => {
        setSelectedGenres((prevSelected) => 
            prevSelected.includes(genreId) 
            ? prevSelected.filter((g) => g !== genreId) 
            : [...prevSelected, genreId]
        );
    };

    const handleAuthorChange = (author) => {
        setSelectedAuthors((prevSelected) => {
            if (prevSelected.includes(author)) {
                return prevSelected.filter((a) => a !== author); // Bỏ chọn tác giả
            } else {
                return [...prevSelected, author]; // Thêm tác giả vào danh sách đã chọn
            }
        });
    };

    const handlePriceChange = (minPrice, maxPrice) => {
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    const filteredProducts = products
    .filter(product => {
        // Kiểm tra nếu sản phẩm có trạng thái "active"
        if (product.status !== "active") {
            return false; // Loại bỏ sản phẩm không phải "active"
        }

        let inSelectedGenres = true;

        if (selectedGenres.length > 0) {
            if (product.type === "single" && Array.isArray(product.category)) {
                // Kiểm tra nếu sản phẩm đơn lẻ có thể loại và thể loại này có trong các thể loại đã chọn
                inSelectedGenres = product.category.some(cat => selectedGenres.includes(cat._id));
            } else if (product.type === "combo" && Array.isArray(product.products)) {
                // Kiểm tra nếu sản phẩm combo có các sản phẩm con và sản phẩm con có thể loại
                inSelectedGenres = product.products.some(p =>
                    Array.isArray(p.category) && p.category.some(cat => selectedGenres.includes(cat._id))
                );
            }
        }

        const inSelectedAuthors = selectedAuthors.length === 0 || (Array.isArray(product.author) && product.author.some(author => selectedAuthors.includes(author)));


        const inPriceRange = product.price >= minPrice && product.price <= maxPrice;
        return inSelectedGenres && inSelectedAuthors && inPriceRange;
    })
    .sort((a, b) => {
        if (sortOrder === "price-low-to-high") return a.price - b.price;
        if (sortOrder === "price-high-to-low") return b.price - a.price;
        if (sortOrder === "top-sellers") return b.sold - a.sold;
        return 0;
    });

        
        console.log(selectedAuthors);
        console.log(products.author);

    return (
        <div className='shop-container'>
            <Sidebar 
                genres={genres} 
                authors={authors} // Truyền danh sách tác giả vào Sidebar
                onGenreChange={handleGenreChange} 
                onAuthorChange={handleAuthorChange} // Truyền hàm xử lý tác giả vào Sidebar
                onPriceChange={handlePriceChange} 
                onSortChange={handleSortChange} 
            />
            <div className='products-container'>
                <h2 className='total-product'>Showing {filteredProducts.length} products</h2>
                <div className="products-card-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export { Shop };
