import React, { Component } from "react";
import "../style/App.css";
import SinglePage from "./SinglePage";

class App extends Component {
  state = {
    active: false,
    rotateNumber: 0,
    numberImages: "",
    newTab: [],
    start: false,
    rotateDeg: "",
    bigPicture: false,
    enlargementPhoto: "",

  }
  saveImg;


  // function change picture 
  handleChangePicture = (e) => {

    if (e.target.className === "fas fa-arrow-right") {
      this.setState({
        rotateNumber: this.state.rotateNumber - this.state.rotateDeg,
        active: true,
      })
    } else if (e.target.className === "fas fa-arrow-left") {
      this.setState({
        rotateNumber: this.state.rotateNumber + this.state.rotateDeg,
        active: true,
      })
    }
  }



  // download a package of photos from api

  componentDidMount() {

    const api = "https://api.unsplash.com/photos/?client_id=68a78cf83ac9d6e1125fed77b4a3ed93a9203b41cdc1ae749ca8fb9ea0f67609";
    fetch(api)
      .then(response => {
        if (response.ok) {
          return response
        } throw Error(response.status)
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          newTab: data
        })
      })
      .catch(error => console.log(error + "nie działa"))
  }

  handleChangeNumberImages = (e) => {
    const number = e.target.value

    this.setState({
      start: false,
      numberImages: number,
      active: false,
      rotateDeg: 360 / number,
      rotateNumber: 0,
    })

  }

  //function generate picture

  handleGeneratePicture = () => {
    const newTab = [...this.state.newTab];
    let allimg = []
    let count = 0;
    let rotate = 0

    if (this.state.active === false) {
      for (let i = 0; i < this.state.numberImages; i++) {
        let index = Math.floor(Math.random() * newTab.length)
        allimg.push(newTab[index])
        newTab.splice(index, 1)
      }
      this.saveImg = allimg
    } else {
      allimg = this.saveImg;
    }

    return (
      allimg.map(img => {
        rotate = count * this.state.rotateDeg
        let style = { transform: `rotateY(${rotate}deg) translateZ(10em) ` }
        count++
        return (<SinglePage url={img.urls.small} name={img.user.name} alt={img.description} key={img.user.id} stylePage={style} project="singleProject" showImg={this.showImg}
        />)
      }
      ))
  }

  //function showing galleries 

  handleChangeActive = () => {
    if (this.state.numberImages <= 10) {
      this.setState({
        start: true
      })
    } else {
      this.setState({
      })
    }
  }

  //function change width container single image

  checkedStyle = () => {
    if (this.state.numberImages > 8) {
      return { width: "12%" }
    }
    else if (this.state.numberImages > 6) {
      return { width: "15%" }
    }
  }

  // function change size and show img 

  showImg = (e) => {
    let adresSrc = e.target.src
    let adresSrcBig = adresSrc.replace("w=400&", "w=1080&")
    this.setState({
      bigPicture: true,
      enlargementPhoto: adresSrcBig,
      active: true,
    })
  }

  // function that closes the window and returns to the gallery

  handleCloseWindow = () => {
    this.setState({
      bigPicture: false
    })
  }


  render() {
    const { rotateNumber, numberImages, bigPicture, enlargementPhoto } = this.state
    return (
      <>
        <main>
          <h1>Gallery 3D</h1>
          {this.state.start === true ?
            <div className="containerProjects">
              <div className="containerProjectsRotate" style={this.checkedStyle()}>
                <div className="projectsRotate" style={{ transform: `rotateY(${rotateNumber}deg)` }} >
                  {this.handleGeneratePicture()}
                </div>
              </div>
              <i className="fas fa-arrow-right" onClick={this.handleChangePicture}></i>
              <i className="fas fa-arrow-left" onClick={this.handleChangePicture}></i>
            </div> : (numberImages > 10 ? <div className="error"><p>error please choose a number less than 10</p></div> : null)}
          <div className="containerNumberImg">
            <label>select the number of photos from 1 to 10<input type="number" name="numberImages" min="1" max="10" placeholder="0-10" value={numberImages} onChange={this.handleChangeNumberImages} /></label>
            <button onClick={this.handleChangeActive}>load</button>
          </div>
          {bigPicture === true ? <div className="bigPicture"> <div><i className="far fa-times-circle" onClick={this.handleCloseWindow}></i> <img src={enlargementPhoto} alt={"bigger"} /></div> </div> : null}
        </main>

      </>
    )
  }
}

export default App;
