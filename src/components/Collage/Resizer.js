import React, {useCallback, useState, useRef, useMemo} from 'react';
import cls from 'classnames';
import {Movable} from 'webrix/components';

const {move, update, snap} = Movable.Operations;

const Resizer = ({orientation, onResize}) => {

    const [position, setPosition] = useState({});
    const ref = useRef();
    const props = Movable.useMove(useMemo(() => [
        move(ref),
        update(setPosition),
    ], []));

    //const movable = useRef();
    const handleOnMove = useCallback(({x, y}) => {
        onResize(orientation === 'row' ? x : y);
    }, [onResize, orientation]);
    return (
        <Movable {...props} ref={ref} onMove={handleOnMove} className={cls('resizer', orientation)} style={position}/>
    );
};

export default Resizer;
