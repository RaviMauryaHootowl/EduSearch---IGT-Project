import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { FcSearch, FcAbout } from 'react-icons/fc';
import { FaMapMarkerAlt, FaBookReader, FaUserCircle, FaReact } from 'react-icons/fa';
import { MdCall, MdEmail } from 'react-icons/md';
import { useHistory, useParams } from 'react-router';
import styles from './DetailsPage.module.css';
import Iframe from 'react-iframe';

const DetailsPage = () => {
  const history = useHistory();
  const {instID} = useParams();
  const [instData, setInstData] = useState();
  const [searchQ, setSearchQ] = useState("");

  const mapLinks = {
    "Veermata Jijabai Technological Institute" : "https://maps.google.com/maps?q=vjti&t=k&z=15&ie=UTF8&iwloc=&output=embed",
    "Sardar Patel Institute of Technology": "https://maps.google.com/maps?q=iit%20bombay&t=k&z=15&ie=UTF8&iwloc=&output=embed",
    "Bombay Scottish School": "https://maps.google.com/maps?q=Bombay%20Scottish%20School%20mahim&t=k&z=15&ie=UTF8&iwloc=&output=embed"
  }

  useEffect(() => {
    fetchData();
  }, [instID]);

  const fetchData = () => {
    axios.get(`/api/getInst`, {
      params: {
        instID: instID
      }
    })
    .then((res) => {
      const status = res.status;
      const {code, value} = res.data;
      // console.log(status);
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


  return (
    <div className={styles.detailsPageContainer}>
      <div className={styles.topBarContainer}>
        <span className={styles.logoTopBar} onClick={goHome}>EduSearch</span>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} type="text" className={styles.searchBarInput} placeholder={`Search for schools, colleges, etc`}/>
            <button onClick={onSearchClick} className={styles.searchBtn}><FcSearch size={25} /></button>
          </div>
        </div>
      </div>
      <div className={styles.bottomPageContainer}>
        <div className={styles.imageSectionContainer}>
          <img className={styles.instImage} src={(instData !== undefined ) ? instData.image : ""} alt=""/>
        </div>
        <div className={styles.infoSectionContainer}>
          <span className={styles.instNameInfo}>{(instData !== undefined ) ? instData.name : ""}</span>
          <div className={styles.instTwoBlockContainer}>
            <FaMapMarkerAlt size={25} color={"#008b8b"} className={styles.infoIcon}/>
            <span className={styles.infoValue}>{(instData !== undefined ) ? instData.address : ""}</span>
          </div>
          {(instData !== undefined && instData.board !== "") && <div className={styles.instTwoBlockContainer}>
            <FaBookReader size={25} color={"#8e44ad"} className={styles.infoIcon} />
            <span className={styles.infoValue}>{(instData !== undefined ) ? instData.board : ""}</span>
          </div>}
          <div className={styles.instTwoBlockContainer}>
            <FaUserCircle size={25} color={"#e67e22"} className={styles.infoIcon} />
            <span className={styles.infoValue}>{(instData !== undefined ) ? instData.category : ""}</span>
          </div>
          <div className={styles.instTwoBlockContainer}>
            <FaReact size={25} color={"#3498db"} className={styles.infoIcon} />
            <span className={styles.infoValue}>{(instData !== undefined ) ? instData.website : ""}</span>
          </div>
          <div className={styles.instTwoBlockContainer}>
            <MdCall size={25} color={"#e74c3c"} className={styles.infoIcon} />
            <span className={styles.infoValue}>{(instData !== undefined ) ? instData.phone.join("/") : ""}</span>
          </div>
          <div className={styles.instTwoBlockContainer}>
            <MdEmail size={25} color={"#f1c40f"} className={styles.infoIcon} />
            <span className={styles.infoValue}>{(instData !== undefined ) ? instData.email : ""}</span>
          </div>
        </div>
      </div>
      {/* <iframe title="Map" src={`${mapLinks[(instData !== undefined ) ? instData.name : ""]}`} className={styles.mapFrame} allowfullscreen="" loading="lazy"></iframe> */}
      
      <Iframe url={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDWc7o9bLFfq_mYwEn7HTUERu2_Z9USF8M&q=${(instData !== undefined) ? instData.address : ""}&maptype=satellite`}
        className={styles.mapFrame}
        display="initial"
        position="relative"/>
    </div>
  );
}

export default DetailsPage;
