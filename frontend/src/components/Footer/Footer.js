import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <>

            
        <div className='footer'>
            <div className='about-us'>Portfolios</div>
            <div className='footer-line'></div> 
            <div className='stuff'>
                <div className='portfolio-links'>

                    <div className='links-to-profile'>
                    <h1>Vikram Singh</h1>
                    <a href="https://github.com/Bikram91" target="_blank"><i class="fa-brands fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/bikramjit-singh-153614140/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                    </div>

                      <div className='links-to-profile'>
                      <h1>Rex Kho</h1>
                          <a href="https://github.com/RexKho" target="_blank"><i class="fa-brands fa-github"></i></a>
                          <a href="https://www.linkedin.com/in/khorex/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                      </div>


                      <div className='links-to-profile'>
                          <h1>Nestor Vega</h1>
                          <a href="https://github.com/nvega23" target="_blank"><i class="fa-brands fa-github"></i></a>
                          <a href="https://www.linkedin.com/in/nestor-vega-233b43238/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                      </div>


                      <div className='links-to-profile'>
                          <h1>William Weihnacht</h1>
                          <a href="https://github.com/WilliamWeihnacht" target="_blank"><i class="fa-brands fa-github"></i></a>
                          <a href="https://www.linkedin.com/in/william-weihnacht/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                      </div>

                      <div className='links-to-profile'>
                          <h1>Saleh Alkaheli</h1>
                          <a href="https://github.com/saleh-alk" target="_blank"><i class="fa-brands fa-github"></i></a>
                          <a href="https://www.linkedin.com/in/saleh-alkaheli-97971815a/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                      </div>
                </div>

                
            </div> 

        </div>
    </>
  )
}

export default Footer