import React from "react";
import '../style/App.css'
const SinglePage = (props) => {



  return (
    <article className={props.project} style={props.stylePage} >
      <div className="singleProjectImg"><h2>{props.name}</h2>
        <img onClick={(e) => props.showImg(e)} src={props.url} alt={props.alt} />
      </div>
      <div className="singleProjectText">
        <p>{props.alt === null ? "this photo has no description" : props.alt}</p>
      </div>
    </article>
  );


}


export default SinglePage;
