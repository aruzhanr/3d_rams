import React, { useState } from 'react';

function ToolTip({ children, text }){
  const [showToolTip, setShowToolTip] = useState(false);

  const onMouseEnterHandler = () => {
    setShowToolTip(true);
  };

  const onMouseLeaveHandler = () => {
    setShowToolTip(false);
  };
  return (
    <div className='hotspot_content' onMouseEnter={onMouseEnterHandler} 
    onMouseLeave={onMouseLeaveHandler}
    >
      {children}
      {showToolTip && 
        <div className='tooltip'>
          {text}
        </div>
      }
    </div>
  );
};

export default ToolTip;