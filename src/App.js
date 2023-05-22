import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingBar from 'react-top-loading-bar';
import { useContext } from 'react';
import weatherContext from './Components/Context/weatherContext';

import Landing from './Components/Landing';
import Weather from './Components/Weather';

import bgVideo from "./Assets/Background/videoplayback.webm";

function App() {
  const context = useContext(weatherContext)
  const { progress, setProgress } = context
  return (
    
    <div className="App relative scroll-smooth min-h-screen h-screen w-full">
        <LoadingBar
          color='#f06236'
          height="5px"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <div className="content">
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          className="object-cover absolute w-full h-full max-h-screen shadow-xl"
        />
        <div className="bgOverlay absolute top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.4)]"></div>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/Weather" element={<Weather />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
