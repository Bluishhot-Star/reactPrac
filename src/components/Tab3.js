import { useState, useEffect } from "react";
function Tab3(props) {
  const [imgIdx, setImgIdx] = useState(props.i+1);
  return(
    <div className="tab">
      tab3
    </div>
  )
}

export default Tab3;