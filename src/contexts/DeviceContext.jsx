import { createContext, useCallback, useEffect, useState } from 'react';

export const DeviceContext = createContext();

const DeviceContextProvider = ({ children }) => {
    const [device, setDevice] = useState('');

    const handleDeviceSet = useCallback(() => {
        if (device !== 'desktop' && window.innerWidth > 1015) setDevice('desktop');
        else if (device !== 'tablet' && window.innerWidth >= 789 && window.innerWidth <= 1015)
            setDevice('tablet');
        else if (device !== 'mobile' && window.innerWidth >= 679 && window.innerWidth < 789)
            setDevice('mobile');
        else if (device !== 'sm-mobile' && window.innerWidth < 679) setDevice('sm-mobile');
    }, [device]);

    window.addEventListener('resize', handleDeviceSet);

    useEffect(() => {
        handleDeviceSet();
    }, [handleDeviceSet]);

    return <DeviceContext.Provider value={{ device }}>{children}</DeviceContext.Provider>;
};

export default DeviceContextProvider;
