import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { FcSearch, FcAbout } from 'react-icons/fc';
import { FaMapMarkerAlt, FaBookReader, FaUserCircle, FaReact } from 'react-icons/fa';
import { MdCall, MdEmail } from 'react-icons/md';
import { useHistory, useParams } from 'react-router';
import styles from './DetailsPage.module.css';
import Iframe from 'react-iframe';
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet';
import StarRatings from 'react-star-ratings';

const DetailsPage = () => {
  const history = useHistory();
  const {gid} = useParams();
  const [instData, setInstData] = useState();
  const [searchQ, setSearchQ] = useState("");
  const [position, setPosition] = useState([20,80]);
  // const [map, setmap] = useState(null);

  useEffect(() => {
    fetchData();
  }, [gid]);

  const fetchData = () => {
    axios.get(`/api/getInst`, {
      params: {
        gid: gid
      }
    })
    .then((res) => {
      const status = res.status;
      const {code, value} = res.data;
      if(status === 200 && code === "OK"){
        setInstData(value);
        const coords = JSON.parse(value.geojson).coordinates;
        setPosition([coords[1], coords[0]]);
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
  
  const imageMap = {
    "VJTI Director's Bungalow": "https://qph.fs.quoracdn.net/main-qimg-8582c4df15509849d08809763b75b1a9",
    "Dwarkadas J Sanghvi College of Engineering": "https://aniportalimages.s3.amazonaws.com/media/details/College_Building_photo_ob0p4o0.jpg",
    "Government Secondary School, Hapoli": "https://directory.edugorilla.com/wp-content/uploads/sites/6/2017/12/9d87b4539497dbe11ae7aad0c6a34789-1.jpeg"
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
        <div className={styles.imageSectionContainer}>
          <img className={styles.instImage} src={(instData !== undefined) ? imageMap[instData.name] : ""} alt=""/>
        </div>
        <div className={styles.infoSectionContainer}>
          <span className={styles.instNameInfo}>{(instData !== undefined ) ? instData.name : ""}</span>
          <StarRatings
            rating={(instData !== undefined ) ? parseInt(instData.rating) : 5}
            starRatedColor="gold"
            numberOfStars={5}
            name='rating'
            starDimension="30px"
            starSpacing="5px"
            />
          <div className={styles.instTwoBlockContainer}>
            <FaMapMarkerAlt size={25} color={"#008b8b"} className={styles.infoIcon}/>
            <span className={styles.infoValue}>{(instData !== undefined ) ? JSON.parse(instData.geojson).coordinates.join(" ~ ") : ""}</span>
          </div>
          {(instData !== undefined && instData.board !== null) && <div className={styles.instTwoBlockContainer}>
            <FaBookReader size={25} color={"#8e44ad"} className={styles.infoIcon} />
            <span className={styles.infoValue}>{(instData !== undefined || instData.board !== undefined ) ? instData.board : "college"}</span>
          </div>}
          <div className={styles.instTwoBlockContainer}>
            <FaUserCircle size={25} color={"#e67e22"} className={styles.infoIcon} />
            <span className={styles.infoValue}>{(instData !== undefined ) ? instData.amenity : ""}</span>
          </div>
          <div className={styles.instTwoBlockContainer}>
            <FaReact size={25} color={"#3498db"} className={styles.infoIcon} />
            <span className={styles.infoValue}>{(instData !== undefined && instData.website !== undefined) ? instData.website : "www.college.com"}</span>
          </div>
          <div className={styles.instTwoBlockContainer}>
            <MdCall size={25} color={"#e74c3c"} className={styles.infoIcon} />
            <span className={styles.infoValue}>{(instData !== undefined && instData.phone !== undefined ) ? instData.phone : "9876543215"}</span>
          </div>
          <div className={styles.instTwoBlockContainer}>
            <MdEmail size={25} color={"#f1c40f"} className={styles.infoIcon} />
            <span className={styles.infoValue}>{(instData !== undefined && instData.email !== undefined) ? instData.email : "info@college.com"}</span>
          </div>
        </div>
      </div>
      {/* <iframe title="Map" src={`${mapLinks[(instData !== undefined ) ? instData.name : ""]}`} className={styles.mapFrame} allowfullscreen="" loading="lazy"></iframe> */}
      
      <div className={styles.mapContainer}>
        <MapContainer center={position} zoom={3} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {(instData !== undefined) ?instData.name : ""}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      

      {/* <Iframe url={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDWc7o9bLFfq_mYwEn7HTUERu2_Z9USF8M&q=${(instData !== undefined) ? instData.address : ""}&maptype=satellite`}
        className={styles.mapFrame}
        display="initial"
        position="relative"/> */}
    </div>
  );
}


// const Map = ({ position, zoom }) => {
  
//   if (map) {
    
//   }
//   return (
//     <div className="map">
//       <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={position}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }

export default DetailsPage;
