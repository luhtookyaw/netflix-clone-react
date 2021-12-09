import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { BsFillCaretDownFill } from 'react-icons/bs';

var avatorIcons = {
    "Barry": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
    "Holly": "https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png",
    "Happy": "https://i.pinimg.com/originals/e3/94/30/e39430434d2b8207188f880ac66c6411.png",
    "Johny": "https://mir-s3-cdn-cf.behance.net/project_modules/disp/2c659933850498.56ba69ac2e080.png",
};

function Nav() {
    const [show, setShow] = useState(false);
    const [active, setActive] = useState(false);
    const [avator, setAvator] = useState("https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png")
    const handleShow = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    useEffect(() => {
        console.log(window.innerWidth > 600);
        window.addEventListener("scroll", handleShow);
        return () => {
            window.removeEventListener("scroll", handleShow);
        };
    }, []);
    
    return (
        <div className={`nav ${show && "nav-black"}`}>
            <img 
                className="nav-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png"
                alt="Neflix Logo"
            />
            <div className="nav-left">
                <a href="/">home</a>
                <a href="#">TV shows</a>
                <a href="#">Movies</a>
                <a href="#">Latest</a>
                <a href="#">My List</a>
            </div>
            <Popup
                key={`tp-bottom ${(window.innerWidth > 600) ? "center" : "left"}`}
                trigger={
                    <div className="nav-browse">
                        Browse <BsFillCaretDownFill size={10}/>
                    </div>
                }
                position={`bottom ${(window.innerWidth > 600) ? "center" : "left"}`}
            >
                <div className="nav-dropdown">
                    <a href="/">home</a>
                    <a href="#">TV shows</a>
                    <a href="#">Movies</a>
                    <a href="#">Latest</a>
                    <a href="#">My List</a>
                </div>
            </Popup>
            <div className="nav-right">
                <div class={`search-box ${active && "active"}`}>
                    <i class="fa fa-search search-box__icon" onClick={() => setActive(!active)}></i>
                    <input class="search-box__input" placeholder="Titles, people, genres"/>
                </div>
                <Popup
                    key={`tp-bottom right`}
                    trigger={
                        <img 
                            className="nav-avator"
                            src={avator}
                            alt="Avator Logo"
                        />
                    }
                    position="bottom right"
                >
                    <div className="nav-profile-dropdown">
                        {
                            Object.entries(avatorIcons).map(([name, icon]) => {
                                return (
                                    <a href="#" onClick={()=> setAvator(icon)}>
                                        <img 
                                            className="nav-avator dropdown"
                                            src={icon}
                                            alt="Avator Logo"
                                        />{name}
                                    </a>
                                );
                            })
                        }
                        <a href="#">Kids</a>
                        <a href="#">Manage Profiles</a>
                    </div>
                    <div className="nav-profile-dropdown setting">
                        <a href="#">Account</a>
                        <a href="#">Help Center</a>
                        <a href="#">Sign out of Neflix</a>
                    </div>
                </Popup>
            </div>
        </div>
    )
}

export default Nav
