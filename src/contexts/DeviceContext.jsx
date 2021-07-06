import { createContext, useState } from 'react';

export const DeviceContext = createContext();

const DeviceContextProvider = ({ children }) => {
    const [device, setDevice] = useState(
        window.innerWidth > 1015
            ? 'desktop'
            : window.innerWidth >= 789 && window.innerWidth <= 1015
            ? 'tablet'
            : window.innerWidth >= 679 && window.innerWidth < 789
            ? 'mobile'
            : window.innerWidth < 679
            ? 'sm-mobile'
            : ''
    );

    const handleDeviceSet = () => {
        if (device !== 'desktop' && window.innerWidth > 1015) setDevice('desktop');
        else if (device !== 'tablet' && window.innerWidth >= 789 && window.innerWidth <= 1015)
            setDevice('tablet');
        else if (device !== 'mobile' && window.innerWidth >= 679 && window.innerWidth < 789)
            setDevice('mobile');
        else if (device !== 'sm-mobile' && window.innerWidth < 679) setDevice('sm-mobile');
    };

    window.addEventListener('resize', handleDeviceSet);

    return <DeviceContext.Provider value={{ device }}>{children}</DeviceContext.Provider>;
};

export default DeviceContextProvider;
