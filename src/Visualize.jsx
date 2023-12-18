import React, { useState, useEffect } from 'react';

import Tooltip from './Tooltip';

import allaround from './images/360degree.png'
import sofa from './images/Интерьер.svg'
import view1 from './images/i-00.jpg'
import view2 from './images/i-1.jpg'
import view3 from './images/i-22.jpg'
import close from './images/close.svg'

const total_img = 120

export default function Visualization() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const [showPopUp, setShowPopUp] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [content, setContent] = useState('');


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopUp(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showPopUp]);


  const imagePaths = Array.from({ length: total_img }, (_, index) => {
    return require(`./images/${index}.jpg`);
  });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart;
      const sensitivity = 0.5;

      const deltaImgIdx = Math.round(deltaX * sensitivity);
      const newImgIdx = Math.max(0, Math.min(current + deltaImgIdx, total_img - 1));

      setCurrent(newImgIdx);
      setDragStart(e.clientX);

    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  let data = {
    view1: view1,
    view2: view2,
    view3: view3,
  }

  return (
    <div
      className="content"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {(showPopUp) ?
        <>
          <div className='modal'>
            <div className='modal_content'>
              <img src={allaround} />
              <h1> Используйте мышь для прокручивания вида </h1>
            </div>
          </div>
        </>
        : (current === 18) ?
          <div className="image">
            <img
              src={imagePaths[current]}
              draggable="false"
              width='100%' height='700'
            />
            <div className='hotspot'>
              <Tooltip text={'Ракурс № 1'}>
                <div className='hotspot_content' >
                  <img className='pin' src={sofa} height={'35'} width={'35'} onClick={(e) => { setShowContent(true); setContent('view1') }} />
                </div>
              </Tooltip>
            </div>

          </div>
          :
          <div className="image">
            <img
              src={imagePaths[current]}
              draggable="false"
              width='100%' height='700'
            />

          </div>
      }
      {
        (showContent) &&
        <>
          <div className='hotspot'>
            <div className='popImgs'>
              <div className='icon_close' onClick={(e) => { setShowContent(false) }}>
                <img src={close} height={30} width={30} />
              </div>
              <img className='popImg' src={data[content]} />

            </div>

          </div>
        </>
      }
    </div>

  );
};


