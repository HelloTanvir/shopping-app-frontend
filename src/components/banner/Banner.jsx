import React, { useState } from 'react';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import Classes from './Banner.module.css';

const Banner = () => {
    const [hideTxt, setHideTxt] = useState(false);

    document.addEventListener('scroll', () => {
        setHideTxt(window.scrollY > window.innerHeight / 2 - 80);
    });

    return (
        <div style={{ height: '100vh' }}>
            <div className={Classes.bannerContainer}>
                <div className={[Classes.textContainer, hideTxt && Classes.hideText].join(' ')}>
                    <Typist avgTypingDelay={100} cursor={{ blink: true }}>
                        Atharo is your shopping store !!!
                    </Typist>
                </div>
            </div>
        </div>
    );
};

export default Banner;
