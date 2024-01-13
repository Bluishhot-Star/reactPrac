import { useState, useEffect } from "react";
function Tab2(props) {
  const [imgIdx, setImgIdx] = useState(props.i+1);
  return(
    <div className="tab">
      TAB2
    </div>
  )
}

export default Tab2;