import React, { useState } from 'react';
import {Dropdown} from '../components/Dropdown';
import { CSSTransition } from 'react-transition-group';
import { ImageList } from '../components/ImageList';
import { Alert } from '../components/Alert';
import { TextField } from '@material-ui/core';

const rovers = [
    {
        id: 1,
        name: 'Curiosity'
    },
    {
        id: 2,
        name: 'Opportunity'
    },
    {
        id: 3,
        name: 'Spirit'
    },
]
  
const cameras = [
    {
        id: 1,
        abbreviation: 'fhaz',
        name: 'Front Hazard Avoidance Camera',
        rovers: ['Curiosity', 'Opportunity', 'Spirit']
    },
    {
        id: 2,
        abbreviation: 'rhaz',
        name: 'Rear Hazard Avoidance Camera	',
        rovers: ['Curiosity', 'Opportunity', 'Spirit']
    },
    {
        id: 3,
        abbreviation: 'mast',
        name: 'Mast Camera',
        rovers: ['Curiosity']
    },
    {
        id: 4,
        abbreviation: 'chemcam',
        name: 'Chemistry and Camera Complex',
        rovers: ['Curiosity']
    },
    {
        id: 5,
        abbreviation: 'mahli',
        name: 'Mars Hand Lens Imager',
        rovers: ['Curiosity']
    },
    {
        id: 6,
        abbreviation: 'mardi',
        name: 'Mars Descent Imager',
        rovers: ['Curiosity']
    },
    {
        id: 7,
        abbreviation: 'navcam',
        name: 'Navigation Camera',
        rovers: ['Curiosity', 'Opportunity', 'Spirit']
    },
    {
        id: 8,
        abbreviation: 'pancam',
        name: 'Panoramic Camera',
    },
    {
        id: 9,
        abbreviation: 'minites',
        name: 'Miniature Thermal Emission Spectrometer',
    }
]

  
export const Home = () => {
    const [showRover, setShowRover] = useState(true);
    const [showCamera, setShowCamera] = useState(false);
    const [showSol, setShowSol] = useState(false);
    const [roverValue, setRoverValue] = useState('');
    const [cameraValue, setCameraValue] = useState('');
    const [solValue, setSolValue] = useState('');
    const [imgList, setImgList] = useState([]);
    const [page, setPage] = useState(1);
    const [noMore, setNoMore] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");

    const submitRoverHandler = (event, name) => {
        event.preventDefault();
        setImgList([]);
        setPage(1);
        setSolValue('');
        setShowAlert(false);
        setShowRover(false);
        setRoverValue(name.toLowerCase());
    }

    const submitCameraHandler = (event, name) => {
        event.preventDefault();
        setShowAlert(false);
        setShowCamera(false);
        console.log("Camera",name);
        setCameraValue(cameras.find(element => element.name === name).abbreviation);
    }

    const apiRequest = event => {
        event.preventDefault();
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverValue}/photos?sol=${solValue}&camera=${cameraValue}&page=${page}&api_key=xrmjhy2apNicfrbzdQpIEG8U4QpM4cR7xtPc1Jw4`)
        .then(res => res.json())
        .then((data) => {
            if (data.photos.length === 0) {
                setShowAlert(true);
                setAlertText("Nothing to show. Try to choose another camera or sol.");
            }else {
                setImgList(data.photos);
                if (data.photos.length > 0) {
                    setImgList(imgList.concat(data.photos));
                    setNoMore(false);
                }
                if (data.photos.length < 25){
                    setNoMore(true);
                }
                setPage(prev => prev + 1);
            }
        })
        .catch(() => {
            setNoMore(true);
            setShowAlert(true);
            setAlertText("Trouble with server!");
        })
    }

    const submitSolHandler = event => {
        event.preventDefault();
        setShowSol(false);
        apiRequest(event);
        console.log("Sol:", solValue);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col text-center">
                    <h1>
                        Images from Mars
                    </h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <CSSTransition
                        in={showRover}
                        timeout={300}
                        classNames="node"
                        unmountOnExit
                        onEnter={() => setShowCamera(false)}
                        onExited={() => setShowCamera(true)}
                    >
                        <Dropdown items={rovers} title={"rover"} showNext={submitRoverHandler}/>
                    </CSSTransition>
                    <CSSTransition
                        in={showCamera}
                        timeout={300}
                        classNames="node"
                        unmountOnExit
                        onEnter={() => setShowSol(false)}
                        onExited={() => setShowSol(true)}
                    >
                        <Dropdown items={cameras} title={"camera"} showNext={submitCameraHandler}/>
                    </CSSTransition>
                    <CSSTransition
                        in={showSol}
                        timeout={300}
                        classNames="node"
                        unmountOnExit
                        onEnter={() => setShowRover(false)}
                        onExited={() => setShowRover(true)}
                    >
                        <form className="container-fluid" onSubmit={submitSolHandler}>
                            <div className="row">
                                <div className="col-lg-3 col-md-1"></div>
                                <div className="col-lg-6 col-md-10 col-sm-12 text-center">
                                    <TextField
                                        className="drop-list"
                                        id="standard-textarea"
                                        label="Choose sol"
                                        value={solValue}
                                        onChange={e => setSolValue(e.target.value)}
                                        inputProps={{ type: 'number'}}
                                    />
                                </div>
                                <div className="col-lg-3 col-md-1"></div>
                            </div>
                        </form>
                    </CSSTransition>
                </div>
            </div>
            <div className="row" style={{marginTop: 20}}>
                <ImageList imgList={imgList} />
            </div>
            {showAlert && <Alert text={alertText} showAlert={setShowAlert}/>}
            <div className="row" style={{marginBottom: 20, marginTop: 10}}>
                <div className="col text-center">
                    {!noMore && <button className="btn btn-outline-primary load_btn" type="button" onClick={e => apiRequest(e)}>Load more</button>}
                </div>
            </div>
        </div>
    );
}
