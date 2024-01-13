// eslint-disable-next-line

import './App.css';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import './redshoes.jpeg'
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom"
import data from './data.js'
import Item from './components/Item.js'
import Tab1 from './components/Tab1.js'
import Tab2 from './components/Tab2.js'
import Tab3 from './components/Tab3.js'
import Detail from './pages/Detail.js'
import styled from "styled-components"
import axios from "axios"
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'
let Alert = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 100px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #96e47c;
  transition: 1s;
  border: 3px solid #6bb653;
  box-shadow: 2px 2px 5px #8f8f8f, -1px -1px 3px #8f8f8f;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
  z-index:1;
`;
function App() {
  const [shoes, setShoes] = useState(data)
  let navigate = useNavigate();

  let alertRef = useRef();
  let loadingRef = useRef();

  const [moreData, setMoreData] = useState(2);

  const [moreBtnState, setMoreBtnState] = useState(true);
  const [loadingState, setLoadingState] = useState(false);

  const getMoreData = async()=>{
    setLoadingState(true);
    await axios.get(`https://codingapple1.github.io/shop/data${moreData}.json`)
    .then((res)=>{
      console.log(res.data);
      setMoreData(moreData+1)
      let copy = [...shoes, ...res.data];
      setShoes(copy);
      setLoadingState(false);
    })
    .catch((err)=>{
      console.log(err);
      setMoreBtnState(false)
    })
  }
  useEffect(()=>{
    if(alertRef.current){
      try{
        alertRef.current.classList.remove("deleted");
        let time = setTimeout(() => {
          alertRef.current.classList += " deleted"
        }, 4000);
        return(()=>{
          clearTimeout(time)
        })
      }
      catch{
        
      }
    }
  })
  useEffect(()=>{
    if(loadingRef.current){
      try{
        if(loadingState){
          loadingRef.current.classList.remove("deleted");
        }
        else{
          if(!loadingRef.current.classList.contains("deleted")){
            loadingRef.current.classList += " deleted"
          }
        }
      }
      catch{
        
      }
    }
  },[loadingState])

  const tabBtnRef = useRef([]);
  const [tabIdx, setTabIdx] = useState(0)
  const [clicked, setClicked] = useState("")
  const tabClick = (idx)=>{
    if(tabIdx !== idx){
      tabBtnRef.current[tabIdx].classList.remove("selected");
      tabBtnRef.current[idx].classList += " selected";
      setTabIdx(idx);
    }
  }
  useEffect(()=>{
    tabBtnRef.current[tabIdx].classList += " selected";
  },[])

  
  
  // const RenderTab = (props)=>{
  //   switch (props.idx) {
  //     case 0:
  //       return <Tab1/>;
  //       break;
  //     case 1:
  //       return(<Tab2/>)
  //       break;
  //     case 2:
  //       return(<Tab3/>)
  //       break;
    
  //     default:
  //       return(<Tab1/>)
  //       break;
  //   }
    
  // }
  // function RenderTab({idx}){
  //   return [ <Tab1/>,  <Tab2/>,  <Tab3/> ][idx]
  // }
  function RenderTab({idx}){
    const [pop, setPop] = useState("");
    
    useEffect(()=>{
      setTimeout(() => {
        setPop("selected");
      }, 100);
      return()=>{
        setPop("")
      }
    },[idx])
    useEffect(()=>{
      flushSync(()=>{setPop("");})
      setPop("selected")
    },[idx])

    return(
      <div className={"unselected " + pop}>
        {
          [ <Tab1/>,  <Tab2/>,  <Tab3/> ][idx]
        }
      </div>
    )
  }

  return (
    <div className="App">
      {/* Nav bar */}
      <Navbar variant="dark" className='nav-container'>
        <Container className='navbar'>
          <Navbar.Brand  onClick={()=>{ navigate('/');}}>RED WAVE</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/');}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail/1'); console.log("Heelo") }}>detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Routes */}
      <Routes>

        {/* Main Page */}
        <Route path='/' element={
          <>
            {!moreBtnState ? <Alert ref={alertRef} className='alert more deleted'>모든 데이터 로드 완료!</Alert> : null}
            <Alert ref={loadingRef} className='alert more deleted'>로딩중!</Alert>
            <div className="main-bg"></div>
            <div className="wrapper">
              <div className='item-title'><p>SHOES LIST</p></div>
              <div className="item-container">
                {
                  shoes.map(function(a,i) {
                    const idx = i+1
                    return(
                    <Link to={"/detail/"+idx} key={i}><Item data={shoes} i={i} /></Link>
                    )
                  })
                }
              </div>
            </div>
            {
              moreBtnState ? 

                <div className='moreBtn' onClick={()=>{
                  getMoreData()
                }}>
                  신발 더 가져오기 ⬇︎
                </div>
              :
                null
            }
            <div className="wrapper">
              <div className="item-title"><p>More Info</p></div>
              <div className="tab-container">
                <div className="tab-button-container">
                  <div ref={el=>tabBtnRef.current[0]=el} className={"tab-button "} onClick={()=>{tabClick(0)}}><p>tab1</p></div>
                  <div ref={el=>tabBtnRef.current[1]=el} className="tab-button " onClick={()=>{tabClick(1)}}><p>tab2</p></div>
                  <div ref={el=>tabBtnRef.current[2]=el} className="tab-button " onClick={()=>{tabClick(2)}}><p>tab3</p></div>
                </div>
                <div className="tab-content-container">
                  <div className="tab-content">
                    {
                      <RenderTab idx={tabIdx}/>
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
        }></Route>

        {/* Detail Page */}
        <Route path={"/detail/:idx"} element={<Detail data={shoes}/>}></Route>
        {/* {
          data.map(function(a,i) {
            const idx = i+1
            return(
            <Route path={"/detail/"+idx} element={<Detail data={data} i={i}/>}></Route>
            )
          })
        } */}

        {/* Error 404 */}
        <Route path='*' element={
          <div className="error404">
            없는 페이지입니다.
          </div> 
        }></Route>


        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버!</div>} />
          <Route path='location' element={<div>위치!</div>} />
        </Route>
        <Route path='event' element={<Event/>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;

function About() {
  return(
    <div>
      <h4>회사 정보</h4>
      {/* Outlet : 자식 요소 들어올 자리 */}
      <Outlet/>
    </div>
  )
}

function Event() {
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet/>
    </div>
  )
}