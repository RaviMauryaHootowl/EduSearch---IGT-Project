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

  return (
    <div className={styles.fullPageContainer}>
      <div className={styles.topSectionContainer}>
        <div className={styles.bigLogoContainer}>EduSearch</div>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} type="text" className={styles.searchBarInput} placeholder={`Search for schools, colleges, etc`}/>
            <button onClick={onSearchClick} className={styles.searchBtn}><FcSearch size={25} /></button>
          </div>
        </div>
        <a href="https://arcg.is/1nPmP5" target="_blank" rel="noreferrer"><button className={styles.viewgisBtn}>View GIS Map</button></a>
      </div>
      <div className={styles.bottomSectionContainer}>
        <img className={styles.collegeArtImg} src={collegeart} alt="" />
        <span className={styles.infoTitle}>Search of Colleges, Schools and Coaching easily</span>
        <span className={styles.infoSubTitle}>Our Web App let's you easily search all types of Institutions with filters on Location, types, etc.</span>
      </div>
      <div className={styles.footer}>
        <div className={styles.creditsContainer}>
          <span className={styles.creditsTitle}>Project by:</span>
          <span className={styles.creditsNames}>Ravi Maurya</span>
          <span className={styles.creditsNames}>Soumil Kamat</span>
          <span className={styles.creditsNames}>Siddhant Gupta</span>
          <span className={styles.creditsNames}>Prashant Gupta</span>
        </div>
        <div className={styles.footerLogoContainer}>EduSearch</div>
      </div>
      {/* <div class="mapouter"><div class="gmap_canvas"><iframe width="760" height="319" id="gmap_canvas" src="https://maps.google.com/maps?q=iit%20bombay&t=k&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.whatismyip-address.com/divi-discount/"></a><br/><a href="https://www.embedgooglemap.net">insert google map into wordpress</a></div></div> */}
    </div>
  );
}

export default HomePage;
