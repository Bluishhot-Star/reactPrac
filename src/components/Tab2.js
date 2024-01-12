import { useState, useEffect } from "react";
function Tab2(props) {
  const [imgIdx, setImgIdx] = useState(props.i+1);
  return(
    <div className="tab">
      tab2
    </div>
  )
}

export default Tab2;