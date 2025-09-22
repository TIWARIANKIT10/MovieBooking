import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle';
import { PlayCircleIcon } from 'lucide-react';


type Trailer = {
  image: string;
  videoUrl: string;
};

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState<Trailer>(dummyTrailers[0]);
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
      <p className='text-grey-300 font-medium text-lg max-w-[960px]'>Trailers</p>
      <div className='relative mt-6'>
        <BlurCircle top='-100px' right='-100px'/>
        <ReactPlayer src={currentTrailer.videoUrl} controls={false}className='mx-auto max-w-full' width="960px" height="540px" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
  {dummyTrailers.map((trailer, index) => (
    <div
      key={index}
      className="relative-group cursor-pointer mt-4 "
      onClick={() => setCurrentTrailer(trailer)}
    >
      <img
        src={trailer.image}
        
        className="rounded-lg brightness-75 object-cover w-[75%] h-full"
      />
      <PlayCircleIcon
        className="absolute w-12 text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  ))}
</div>
      </div>

    </div>
  )
}

export default TrailersSection