import { useCallback, useEffect } from 'react'
import './Toast.css'


function Toast()
{


    return(
        <div className={`toasts-container `}>
            
            
                    <div 
                         className={`notification toast`}
                       
                    >
                        <div className="toast-content-container">
                            <h3 className='toast-title'>hhhh</h3>
                            <p className='toast-description'>hhhh</p>
                        </div>
                        <button  className="toast-close-btn">X</button>
                    </div>
             
        </div>
    )
}

export { Toast };