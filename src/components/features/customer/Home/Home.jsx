import React,{ useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import LibraryIllustration from "../../../../Assets/Images/Library_Illustration_1.jpg"
import LoadingLottie from "../../../../Assets/Lottie/loading-0.json"; 
import Lottie from "react-lottie"; // Lottie for animation
import './Home.css'
import {  
  GenreCard, 
  NewArrivals,
  Footer
} from "../Index/index.js"


function Home() {

  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const loadingObj = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Fetch data from the API
  useEffect(() => {
    fetch("http://localhost:9999/api/category")
      .then(response => response.json())
      .then(data => {
        setGenre(data); // Set the fetched products to state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);
 

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

 
  return (
    <div className='home-component-container'>
      <div className='home-page-img-container'>
        <img className="home-page-background-img" src={LibraryIllustration} alt="Library Illustration"/>
      </div>

      <h1 className='homepage-headings'>Genres</h1>
      <div className='genre-cards-container'>
          
        {loading ? (
          <Lottie options={loadingObj} height={100} width={100} /> // Show Lottie animation while loading
        ) : (
          genre.length > 0 ? (
            genre.map(genre => (
              <GenreCard key={genre.id} genre={genre} /> // Render ProductCard for each product
            ))
          ) : (
            <p>No genres available.</p> // Message if no products are found
          )
        )}

      </div>

      <Link to={"/shop"}>
        <button 
          className="solid-secondary-btn homepage-explore-all-btn" >
          Explore All
        </button>
      </Link>

      <h1 className='homepage-headings'>New Arrivals</h1>
      <NewArrivals/>
      <Footer/>

    </div>
  )
}

export { Home };