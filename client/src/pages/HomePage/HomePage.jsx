import React,{useState} from 'react';
import styles from './HomePage.module.css';
import {useHistory} from 'react-router-dom';
import {FcSearch} from 'react-icons/fc';
import collegeart from "../../images/collegeart.svg";

const HomePage = () => {
  const history = useHistory();
  const [searchQ, setSearchQ] = useState("");

  const onSearchClick = () => {
    history.push(
      {
        pathname: "/search",
        search: `?q=${searchQ}`
      }
    );
  }

  const onRecommendClick = () => {
    history.push({
      pathname: "/recommend"
    });
  }
 
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearchClick();
    }
  }

  return (
    <div className={styles.fullPageContainer}>
      <div className={styles.topSectionContainer}>
        <div className={styles.bigLogoContainer}>EduSearch</div>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} onKeyDown={handleKeyDown} type="text" className={styles.searchBarInput} placeholder={`Search for schools, colleges, etc`}/>
            <button onClick={onSearchClick} className={styles.searchBtn}><FcSearch size={25} /></button>
          </div>
        </div>
        <button onClick={onRecommendClick} className={styles.viewgisBtn}>Recommend Me</button>
      </div>
      <div className={styles.bottomSectionContainer}>
        <img className={styles.collegeArtImg} src={collegeart} alt="" />
        <span className={styles.infoTitle}>Search of Colleges, Schools and Coaching easily</span>
        <span className={styles.infoSubTitle}>Our Web App let's you easily search all types of Institutions with filters on Location, types, etc.</span>
      </div>
      {/* <iframe title={"Nearby Map"} 
        className={styles.interactMap} 
        src="https://learngis2.maps.arcgis.com/apps/instant/nearby/index.html?appid=90bceaf04c044ad2ae7b6adf1331c9b8" 
        frameborder="0" allowfullscreen>iFrames are not supported on this page.</iframe> */}
      <div className={styles.footer}>
        <div className={styles.creditsContainer}>
          <span className={styles.creditsTitle}>Project by:</span>
          <span className={styles.creditsNames}>Ravi Maurya</span>
          <span className={styles.creditsNames}>Soumil Kamat</span>
          <span className={styles.creditsNames}>Siddhant Gupta</span>
        </div>
        <div className={styles.footerLogoContainer}>EduSearch</div>
      </div>
    </div>
  );
}

export default HomePage;
