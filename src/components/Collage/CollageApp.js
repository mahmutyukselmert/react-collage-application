import React, {useCallback, useState, useRef} from 'react';
import cls from 'classnames';
import {Movable} from 'webrix/components';

import Collage from './Collage';
import Image from './Image';

import '../../styles/Collage.scss';

function CollageApp({ selectedFiles, collageType, collageRef }) {
  
    const img1 = selectedFiles[0] ? URL.createObjectURL(selectedFiles[0]) : null;
    const img2 = selectedFiles[1] ? URL.createObjectURL(selectedFiles[1]) : null;
    const img3 = selectedFiles[2] ? URL.createObjectURL(selectedFiles[2]) : null;
    const img4 = selectedFiles[3] ? URL.createObjectURL(selectedFiles[3]) : null;

    if( collageType == 1 ) {
        return (
            <div className='collage-maker' ref={collageRef}>
                {selectedFiles.length > 0 && (
                    <Collage orientation='row' size={1}>
                        <Image size={0.5} src={img1} />
                        <Collage orientation='column' size={0.5}>
                            <Image size={0.5} src={img2} />
                            <Image size={0.5} src={img3} />
                        </Collage>
                    </Collage>
                )}
            </div>
        );
    }

    if( collageType == 2 ) {
        return (
            <div className='collage-maker' ref={collageRef}>
            {selectedFiles.length > 0 && (
                <Collage orientation='row' size={1}>
                    <Collage orientation='column' size={0.5}>
                        <Image size={0.5} src={img1} />
                        <Image size={0.5} src={img2} />
                    </Collage>
                    <Image size={0.5} src={img3} />
                </Collage>
            )}
            </div>
        );
    }
  
    if( collageType == 3 ) {
        return (
            <div className='collage-maker collage-type-3' ref={collageRef}>
            {selectedFiles.length > 0 && (
                <Collage orientation='column' size={1}>
                    <Collage orientation='row' size={1}>
                        <Image size={0.5} src={img1} className="half-top-1" />
                        <Image size={0.5} src={img2} className="half-top-2" />
                    </Collage>
                    <Image size={1} src={img3} className="full-bottom" />
                </Collage>
            )}
            </div>
        );
    }

    if( collageType == 4 ) {
        return (
            <div className='collage-maker collage-type-4' ref={collageRef}>
            {selectedFiles.length > 0 && (
                <Collage orientation='column' size={1}>
                    <Image size={1} src={img1} pannableClass="full-top" />
                    <Collage orientation='row' size={1}>
                        <Image size={0.5} src={img2} className="half-bottom-1" />
                        <Image size={0.5} src={img3} className="half-bottom-2" />
                    </Collage>
                </Collage>
            )}
            </div>
        );
    }


    if( collageType == 5 && img4 != null ) {
        return (
            <div className='collage-maker' ref={collageRef}>
            {selectedFiles.length > 0 && (
                <Collage orientation='row' size={1}>
                    <Collage orientation='column' size={0.5}>
                        <Image size={0.5} src={img1} />
                        <Image size={0.5} src={img2} />
                    </Collage>
                    <Collage orientation='column' size={0.5}>
                        <Image size={0.5} src={img3} />
                        <Image size={0.5} src={img4} />
                    </Collage>
                </Collage>
            )}
            </div>
        );
    } else {
        return (
            <div className='alert alert-warning'>
                <strong>Önemli!</strong> Lütfen bu kolaj türü için 4 tane görsel seçin. 
            </div>
        );
    }

}

export default CollageApp;
