import React from 'react'
import { assets } from '../../assets/assets'
import './AppDownload.scss'

const AppDownload = () => {
  return (
    <div className='appDownload' id='appDownload'> 
        <p>Yaxshiroq tajriba uchun pomidor ilovasini yuklab oling</p>
        <div className="appDownload__platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload