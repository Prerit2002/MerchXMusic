import {useState , useEffect} from "react";
import "./Landing.css";
// import artist from "./image 3.svg"
// import search from "./Vector.svg"
// import "../node_modules/bootstrap/js/dist/carousel"
import "../../../node_modules/bootstrap/js/dist/carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
function LandingPage({ users }) {
    const [searchResults, setSearchResults] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setSearchResults(users)
        if (searchTerm !== "" && searchResults.length > 0) {
            const results = users.filter(user => {
                return user.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            setSearchResults(results);

        }
       
      
        
       
      }, [searchTerm, users]);

      console.log(searchResults)
      console.log(typeof(searchTerm))



     
      
    
  return (
    <div>
      <div className="merchandmusic">Merch x Music</div>
      <div className="stanHeading">
        STAN FOR <span className="artistHeading">ARTIST</span>
      </div>
      <div className="row gx-0 mt-5 justify-content-center">
        <div className="col-12 col-lg-9">
          {users.map((user, idx) => {
            return (
              <>
                {idx < 10 ? (
                  <button onClick={() => {
                      window.location.href = `artist/${user.id}`;
                  }} className="artistName">{user.name}</button>
                ) : null}
              </>
            );
          })}
          {/* <button className="artistName">Taylor Swift</button>
                    <button className="artistName">Selena Gomez</button>
                    <button className="artistName">LANY</button>
                    <button className="artistName">Shawn Mendes</button>
                    <button className="artistName">Bazzi</button>
                    <button className="artistName">Alan Walker</button>
                    <button className="artistName">Camila Cabello</button>
                    <button className="artistName">Jeremy Zucker</button>
                    <button className="artistName">Jeremy Zucker</button>
                    <button className="artistName">Jeremy Zucker</button> */}
        </div>
      </div>
      <div className="searchForm mb-5">
        <form>
          <input className="searchArtist"  onChange={(e) => {
              e.preventDefault();
        setSearchTerm(e.target.value);
      }} placeholder="Search"></input>
          {/* <img className="searchIcon" src={search}></img> */}
        </form>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
      >
           
        <div className="carousel-inner ">
        {/* <div className="carousel-item justify-content-center active">
                        <img src={`https://ipfs.infura.io/ipfs/${users[1]?.hash}`} className="d-block w-25  artistImg" alt="..." style={{borderRadius:"2rem"}}  />
                    </div> */}
          {searchResults?.map((user,idx) => {
            console.log(user)
            return (
                <div onClick={() => {
                    window.location.href = `artist/${user.id}`;
                }} className={`carousel-item justify-content-center  ${idx === 0 ? "active" : ""} `}  >
            {/* //   <div className="carousel-item justify-content-center"> */}
                <img
                  src={`https://ipfs.infura.io/ipfs/${user.hash}`}
                  className="d-block w-25  artistImg"
                  alt="..."
                  style={{borderRadius:"2rem"}}  
                  
                />
              </div>
            );
          })}
         

         
                    {/* <div className="carousel-item justify-content-center"> 
                        <img src={`https://ipfs.infura.io/ipfs/${users[1]?.hash}`} className="d-block w-75 ms-5 artistImg" alt="..."/>
                    </div> */}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
export default LandingPage;
