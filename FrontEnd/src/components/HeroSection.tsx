import React from 'react'
import {NotebookTabs,Clock,ArrowRight} from 'lucide-react'

import marvelLogo from '../assets/marvelLogo.svg'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate();
  return (<div>

    <div className='  flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] '>
  <img src={marvelLogo} alt='' className='max-h-11 lg:h-11 mt-72'/>

  <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Guardians <br /> of the Galaxy</h1>
  <div className='flex flex-row  justify-between gap-6  text-gray-300'>
        <div className='flex justify-between gap-1 '>
            <div>Action |</div>
            <div>Adventure|</div>
            <div>Sci-fi</div>
        </div>
        <div className='flex gap-1'>
            <NotebookTabs width={15}/>
            2018</div>
        <div className='flex gap-1'>
             <Clock width={15} />
            2hrs 8m</div>
    </div>

    <div className='w-[45%]  text-gray-300'>
        <p>In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy</p>
    </div>

    <div className="mt-10 mb-10 text-gray-300" >
        <button onClick={()=>{navigate('movies')}} className='flex gap-1 px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer' > Explore More
            <ArrowRight width={15}/>
            </button>
    </div>
    </div>
    
    
  </div>
  )
}

export default HeroSection