import React from 'react';
import './App.css';
import {Calendar} from "./components/Calendar/Calendar";

function App() {
    return (
        <>
            {/*<div style={{backgroundColor: "red"}}*/}
            {/*     onClick={() => localStorage.clear()}>Clear local storage*/}
            {/*</div>*/}
            <div className="merry-christmas-text">Merry Christmas!</div>
            <div className="merry-christmas-text2">Every day one box could be opened, let's figure out what's there for
                you!
            </div>
            <Calendar/>
            <div className="build-by-secret-santa">
                2022 build with ❤️ from Secret Santa 🎅🏻
            </div>
        </>
    );
}

export default App;
