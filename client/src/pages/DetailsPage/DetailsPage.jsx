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
    "Veermata Jijabai Technological Institute" : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.779558468566!2d72.85393251437601!3d19.022223158605037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf26f4972d21%3A0x2c50185364aca4c1!2sVeermata%20Jijabai%20Technological%20Institute!5e1!3m2!1sen!2sin!4v1620659126079!5m2!1sen!2sin",
    "Sardar Patel Institute of Technology": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.814294761948!2d72.83392671437754!3d19.12318265545829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9d90e067ba9%3A0x16268e5d6bca2e6a!2sBharatiya%20Vidya%20Bhavan&#39;s%20Sardar%20Patel%20Institute%20of%20Technology!5e1!3m2!1sen!2sin!4v1620659289555!5m2!1sen!2sin"
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
            <span className={styles.infoValue}>{(instData !== undefined ) ? instData.phone : ""}</span>
          </div>
          <div className={styles.instTwoBlockContainer}>
            <MdEmail size={25} color={"#f1c40f"} className={styles.infoIcon} />
            <span className={styles.infoValue}>{(instData !== undefined ) ? instData.email : ""}</span>
          </div>
        </div>
      </div>
      <iframe title="Map" src={`${mapLinks[(instData !== undefined ) ? instData.name : ""]}`} className={styles.mapFrame} allowfullscreen="" loading="lazy"></iframe>
      
      {/* <Iframe url={mapLinks[(instData !== undefined ) ? instData.name : ""]}
        className={styles.mapFrame}
        display="initial"
        position="relative"/> */}
    </div>
  );
}

export default DetailsPage;
