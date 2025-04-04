import {useEffect} from 'react';
import {EventEmitter} from 'eventemitter3';

const emitter = new EventEmitter();

export const useSub = (event: any, callback: any) => {
    const unsubscribe = () => {
        emitter.off(event, callback);
    };

    useEffect(() => {
        emitter.on(event, callback);
        return unsubscribe;
    }, [callback]);

    return unsubscribe;
};

export const usePub = () => {
    return (event: any, data: any) => {
        emitter.emit(event, data);
    };
};