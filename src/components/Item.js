import { useState, useEffect } from "react";
function Item(props) {
  const [imgIdx, setImgIdx] = useState(props.i+1);
  return(
    <div className="item">
      <img src={"https://codingapple1.github.io/shop/shoes"+imgIdx+".jpg"} width="80%" />
      <h4 className='item-title'>{props.data[props.i].title}</h4>
      <p className='item-price'>₩{props.data[props.i].price}</p>
      <p className='item-content'>{props.data[props.i].content}</p>
    </div>
  )
}

export default Item;