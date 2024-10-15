import React,{ useEffect } from 'react'
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import LibraryIllustration from "../../../../Assets/Images/Library_Illustration_1.jpg"
import './Home.css'
import {  
  GenreCard, 
  NewArrivals,
  Footer
} from "../Index/index.js"


function Home() {
 

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
          
        <Link to={"/shop"}> 
            <GenreCard />
        </Link>
        <Link to={"/shop"}> 
            <GenreCard />
        </Link>
        <Link to={"/shop"}> 
            <GenreCard/>
        </Link>
        <Link to={"/shop"}> 
            <GenreCard/>
        </Link>

      </div>

      <Link to={"/shop"}>
        <button 
          className="solid-secondary-btn homepage-explore-all-btn">
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