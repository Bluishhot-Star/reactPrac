import { useParams, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import {useEffect, useState, useRef} from "react"

let SkyBox = styled.div`
  background: ${props => props.background};
  color : ${props => props.background === "black" ? "#efefef" : "#333"};
  padding: 20px;
  border-radius: 10px;
`;
let CountBtn = styled.div`
  width: 100px;
  height: 50px;
  margin-bottom: 10px;
  text-align: center;
  background-color: red;
  font-weight: bold;
  border-radius: 5px;
  line-height: 1rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  background-color: gold;
  transition: 1s;
  border: 3px solid #ffe23c;
  box-shadow: 2px 2px 5px #8f8f8f, -1px -1px 3px #8f8f8f;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
`;

function Detail(props){
  let alertRef = useRef();
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
  },[])
  let [count, setCount] = useState(0);
  
  let {idx} = useParams();
  let navigate = useNavigate();
  let item;


  if(!(Number.isInteger(parseInt(idx))) || parseInt(idx)>parseInt(props.data.length)){
    return(
      <></>
    )
  }
  // data sorting 해도 문제 없도록 데이터 바인딩 시 idx를 순서가 아닌 id로 일치시키기
  //find : 첫번째 요소 반환 / filter : 만족하는 요소 array로 반환
  item = props.data.find((data)=> data.id == idx-1);
  // item = props.data.filter((data)=> data.id == idx-1)[0];

  return(
    <div className="container">
      <Alert ref={alertRef} className='alert deleted'>🔥 5초 안에 구매하면 60% 할인! 🔥</Alert>
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes"+idx+".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
          <div className="item-detail-container">
            <h4 className='item-detail-title'>{item.title}</h4>
            <p className='item-detail-price'>₩{item.price}</p>
            <p className='item-detail-content'>{item.content}</p>
            <button className="btn btn-danger">주문하기</button> 
          </div>
        </div>
      </div>
      <p></p>
      <SkyBox background = "black">{count}</SkyBox>
      <CountBtn onClick={()=>{setCount(count+1)}}>UP</CountBtn>
      <SkyBox background = "white">Hello</SkyBox>



    </div> 
  )
}

export default Detail;