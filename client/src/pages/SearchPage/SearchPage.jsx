import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import styles from './SearchPage.module.css';
import {FcSearch} from 'react-icons/fc';
import queryString from 'query-string';
import axios from 'axios';

const SearchPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [searchQ, setSearchQ] = useState("");
  const [instList, setInstList] = useState([]);
  
  const [locationValue, setLocationValue] = useState("");
  const [locationOptions] = useState([
    {value: ""},
    {value: "Bandra"},
    {value: "Mahim"},
    {value: "Kandivali"},
    {value: "Borivali"},
    {value: "Lokmanya Tilak Marg"},
    {value: "Matunga"},
    {value: "Vile Parle"},
    {value: "Fort"},
    {value: "Mazagaon"},
    {value: "Santacruz"},
    {value: "Tardeo"},
    {value: "Cumbala Hill"},
    {value: "Juhu"},
    {value: "Dadar"},
    {value: "Malabar Hill"},
    {value: "Grant Road"},
    {value: "Goregaon"},
    {value: "Gowalia Tank"},
    {value: "Powai"},
    {value: "Marine Drive"},
    {value: "Navi Mumbai"},
    {value: "Ghatkopar"},
    {value: "Chembur"},
    {value: "Mulund"},
    {value: "Andheri"},
    {value: "Thane"},
    {value: "Worli"},
    {value: "Marine Lines"},
    {value: "Wadala"},
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
    {value: "Boys"},
    {value: "Girls"},
    {value: "Co-ed"},
    {value: "Engineering"},
    {value: "Chemical Engineering"},
    {value: "Pharmacy"},
    {value: "Commerce"},
    {value: "Arts"},
    {value: "Science"},
    {value: "Law"},
    {value: "Management"},
    {value: "Medical"},
    {value: "NID"},
    {value: "NIFT"},
    {value: "NATA"},
    {value: "CEED"},
    {value: "UCEED"},
    {value: "GRE"},
    {value: "IAS"},
    {value: "UPSC"},
    {value: "NAVY SSR"},
    {value: "NET"},
    {value: "JEE Advanced"},
    {value: "NEET"},
    {value: "MHT-CET"},
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
      // console.log(status);
      if(status === 200 && code === "OK"){
        setInstList(value);
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
    <div className={styles.searchFullPageContainer}>
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
        <div className={styles.leftPaneSettings}>
          <span className={styles.filterHeading}>Filters</span>
          <div className={styles.filterList}>
            <div className={styles.filterBlock}>
              Location:
              <select value={locationValue} onChange={e => setLocationValue(e.currentTarget.value)} className={styles.locationDrop}>
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
                instList.map((inst, index) => {
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
    history.push(`/institution/${inst._id}`)
  }

  return (
    <div className={styles.searchResultCardContainer} onClick={navigateToDetails}>
      <img className={styles.instImage} src={inst.image} alt=""/>
      <div className={styles.instInfoContainer}>
        <span className={styles.instName}>{inst.name}</span>
        <span className={styles.instLocation}>{inst.address}</span>
      </div>
    </div>
  );
}

export default SearchPage;