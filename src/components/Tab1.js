import { useState, useEffect } from "react";
function Tab1(props) {
  const [imgIdx, setImgIdx] = useState(props.i+1);
  return(
    <div className="tab">
      TAB1
    </div>
  )
}

export default Tab1;