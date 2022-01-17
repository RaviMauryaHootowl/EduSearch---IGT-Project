import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { FcSearch, FcAbout } from 'react-icons/fc';
import { FaMapMarkerAlt, FaBookReader, FaUserCircle, FaReact } from 'react-icons/fa';
import { MdCall, MdEmail } from 'react-icons/md';
import { useHistory, useParams } from 'react-router';
import styles from './RecommendPage.module.css';
import MapPicker from 'react-google-map-picker';
import StarRatings from 'react-star-ratings';

const DefaultLocation = { lat: 19.2122930243085, lng: 72.86189339922433};
const DefaultZoom = 10;

const RecommendPage = () => {
  const history = useHistory();
  const [instData, setInstData] = useState([]);
  const [searchQ, setSearchQ] = useState("");
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  // const [map, setmap] = useState(null);

  function handleChangeLocation (lat, lng){
    setDefaultLocation({lat:lat, lng:lng});
    fetchData(lat, lng);
  }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }

  function handleResetLocation(){
    setDefaultLocation({ ... DefaultLocation});
    setZoom(DefaultZoom);
  }


  const fetchData = (lat, lng) => {
    axios.get(`/api/recommend`, {
    params: {
        x: lng,
        y: lat,
        limit: 20
    }
    })
    .then((res) => {
      const status = res.status;
      const {code, value} = res.data;
      if(status === 200 && code === "OK"){
        setInstData(value);
      }else{
        alert("Server not responding");
      }
    });
  }

  const onSearchClick = () => {
    history.push(`/search/?q=${searchQ}`);
  }

  const goHome = () => {
    history.push('/');
  }


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearchClick();
    }
  }
  

  return (
    <div className={styles.detailsPageContainer}>
      <div className={styles.topBarContainer}>
        <span className={styles.logoTopBar} onClick={goHome}>EduSearch</span>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} onKeyDown={handleKeyDown} type="text" className={styles.searchBarInput} placeholder={`Search for schools, colleges, etc`}/>
            <button onClick={onSearchClick} className={styles.searchBtn}><FcSearch size={25} /></button>
          </div>
        </div>
      </div>
      <div className={styles.bottomPageContainer}>
        <MapPicker defaultLocation={defaultLocation}
            zoom={zoom}
            mapTypeId="roadmap"
            style={{height:'300px'}}
            onChangeLocation={handleChangeLocation} 
            onChangeZoom={handleChangeZoom}
            apiKey={'AIzaSyDWc7o9bLFfq_mYwEn7HTUERu2_Z9USF8M'}/>
      </div>
      <div className={styles.searchListOuterContainer}>
        <span className={styles.searchListHeader}>Nearby Educational Institutes:</span>
        <div className={styles.searchListGridContainer}>
            {
            instData.map((inst, index) => {
                return <SearchResultCard key={index} inst={inst}/>
            })
            }
        </div>
    </div>
    </div>
  );
}

const SearchResultCard = ({inst}) => {
    const history = useHistory();
    const navigateToDetails = () => {
      history.push(`/institution/${inst.gid}`)
    }
  
    return (
      <div className={styles.searchResultCardContainer} onClick={navigateToDetails}>
        <div className={styles.instInfoContainer}>
          <span className={styles.instName}>{inst.name}</span>
          <span className={styles.instLocation}>{inst.address}</span>
          <span className={styles.instLocation}>{inst.amenity}</span>
          <StarRatings
            rating={parseInt(inst.rating)}
            starRatedColor="gold"
            numberOfStars={5}
            name='rating'
            starDimension="30px"
            starSpacing="5px"
            />
        </div>
      </div>
    );
  }

export default RecommendPage;
