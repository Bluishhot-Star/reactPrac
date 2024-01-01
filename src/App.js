// eslint-disable-next-line

import './App.css';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import './redshoes.jpeg'
import { useState } from "react";
import data from './data.js'
import Item from './components/Item.js'
import Detail from './pages/Detail.js'
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'

function App() {
  const [shoes] = useState(data)
  let navigate = useNavigate();

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
            <div className="main-bg"></div>
              <div className="item-container">
                {
                  data.map(function(a,i) {
                    const idx = i+1
                    return(
                    <Link to={"/detail/"+idx} key={i}><Item data={data} i={i} /></Link>
                    )
                  })
                }
              </div>
          </>
        }></Route>

        {/* Detail Page */}
        <Route path={"/detail/:idx"} element={<Detail data={data}/>}></Route>
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