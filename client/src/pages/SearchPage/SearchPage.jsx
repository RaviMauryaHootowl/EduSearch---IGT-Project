import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import styles from './SearchPage.module.css';
import {FcSearch} from 'react-icons/fc';
import queryString from 'query-string';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from  'react-loader-spinner';

const SearchPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [searchQ, setSearchQ] = useState("");
  const [instList, setInstList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationValue, setLocationValue] = useState({value: ""});
  const [locationOptions] = useState([
    {value: ""},
    {value: "Andhra Pradesh", x: "14.546605396658752", y:"78.76576736563678"},
    {value: "Arunachal Pradesh", x:"26.717150440725334", y:"93.43422614483342"},
    {value: "Assam", x:"26.499347246274493", y:"92.63831190056474"},
    {value: "Chandigarh", x: "30.73978412678969", y:"76.76249607232613"},
    {value: "Chhattisgarh", x: "21.62887133733199", y: "82.26032483657342"},
    {value: "Delhi", x:"28.62617177666731", y:"77.21171980355248"},
    {value: "Goa", x: "15.370350077553725", y:"74.05604136261314"},
    {value: "Gujarat", x: "22.644898048124713", y:"71.11819084661064"},
    {value: "Haryana", x: "29.04350686639383", y:"76.33097023140628"},
    {value: "Himachal Pradesh", x:"31.992679756592665", y:"77.08898979052381"},
    {value: "Jammu and Kashmir", x:"33.70988509145234", y:"75.64796483772766"},
    {value: "Jharkhand", x:"23.423195955206797", y:"85.44546936313496"},
    {value: "Karnataka", x: "14.590676853707729", y:"75.75162294213543"},
    {value: "Kerala", x:"9.786563591273612", y:"76.54195970029582"},
    {value: "Madhya Pradesh", x:"22.828391702179456", y:"76.13437707393838"},
    {value: "Maharashtra", x:"19.05257196226323", y:"73.19942271119965"},
    {value: "Manipur", x:"24.9924336102357", y:"94.04932253784659"},
    {value: "Meghalaya", x:"25.59237881037228", y:"91.23326362032017"},
    {value: "Mizoram", x:"23.457334950938126", y:"92.8417648577433"},
    {value: "Nagaland", x:"25.915294230874288", y:"94.46661902804956"},
    {value: "Orissa", x:"20.156141722078623", y:"84.22358716664834"},
    {value: "Puducherry", x:"11.935117485573299", y:"79.81421388541278"},
    {value: "Punjab", x:"30.96094769208795", y:"75.28821737593432"},
    {value: "Rajasthan", x:"26.461746896314292", y:"73.83772043411449"},
    {value: "Sikkim", x:"27.352043453661842", y:"88.49237703741065"},
    {value: "Tamil Nadu", x:"10.580431858145486", y:"78.43847636955589"},
    {value: "Telangana", x:"17.444436653039762", y:"78.73906584039752"},
    {value: "Tripura", x:"23.827801743319014", y:"91.74691681365455"},
    {value: "Uttar Pradesh", x:"26.971758014375272", y:"80.4518447425702"},
    {value: "Uttarakhand", x:"30.307711418853767", y:"79.20126687909621"},
    {value: "West Bengal", x:"23.201318836181553", y:"87.35524040710807"},
  ])

  const [boardValue, setBoardValue] = useState("");
  const [boardOptions] = useState([
    {value: ""},
    {value: "ICSE"},
    {value: "IGCSE"},
    {value: "IB"},
    {value: "Maharashtra State Board"},
    {value: "CBSE"},
    {value: "HSC"},
    {value: "CIE"}
  ])

  const [categoryValue, setCategoryValue] = useState("");
  const [categoryOptions] = useState([
    {value: ""},
    {value: "kindergarten"},
    {value: "community_centre"},
    {value: "college"},
    {value: "driving_school"},
    {value: "university"},
    {value: "hospital"},
    {value: "school"},
  ])

  useEffect(() => {
    const {q} = queryString.parse(location.search);
    setSearchQ(q);
    fetchData(q);
  },[location]);

  useEffect(() => {
    if(searchQ !== ""){

      fetchData(searchQ);
    }
  }, [locationValue, boardValue, categoryValue])

  const fetchData = (searchQuery) => {
    setIsLoading(true);
    axios.get(`/api/search`, {
      params: {
        q: searchQuery,
        loc : locationValue,
        board: boardValue,
        category: categoryValue
      }
    })
    .then((res) => {
      const status = res.status;
      const {code, value} = res.data;
      // console.log(res.data);
      // console.log(status);
      if(status === 200){
        setInstList(value);
      }else{
        alert("Server not responding");
      }
      setIsLoading(false);
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
    <div className={styles.searchFullPageContainer}>
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
        <div className={styles.leftPaneSettings}>
          <span className={styles.filterHeading}>Filters</span>
          <div className={styles.filterList}>
            <div className={styles.filterBlock}>
              Location:
              <select value={locationValue.value} onChange={e => setLocationValue(locationOptions.find(obj => {return obj.value == e.currentTarget.value}))} className={styles.locationDrop}>
              {locationOptions.map(item => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {(item.value === "") ? "All" : item.value}
                </option>
              ))}
              </select>
            </div>
            <div className={styles.filterBlock}>
              Board:
              <select value={boardValue} onChange={e => setBoardValue(e.currentTarget.value)} className={styles.locationDrop}>
              {boardOptions.map(item => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {(item.value === "") ? "All" : item.value}
                </option>
              ))}
              </select>
            </div>
            <div className={styles.filterBlock}>
              Category:
              <select value={categoryValue} onChange={e => setCategoryValue(e.currentTarget.value)} className={styles.locationDrop}>
              {categoryOptions.map(item => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {(item.value === "") ? "All" : item.value}
                </option>
              ))}
              </select>
            </div>
            
          </div>
        </div>
        <div className={styles.searchListOuterContainer}>
            <span className={styles.searchListHeader}>Search Results:</span>
            <div className={styles.searchListGridContainer}>
              {
                (isLoading) ? <TailSpin
                  heigth="100"
                  width="100"
                  color='blue'
                /> : instList.map((inst, index) => {
                  return <SearchResultCard key={index} inst={inst}/>
                })
              }
            </div>
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

export default SearchPage;