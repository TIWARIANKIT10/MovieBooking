import React, { useEffect, useState,useRef } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { dummyBookingData, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import BlurCircle from '../components/BlurCircle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import DateSelect from '../components/DateSelect';
import MoviesCart from '../components/MoviesCart';





// ---------- TYPES ----------
type Genre = {
  id: number;
  name: string;
};

type Cast = {
  name: string;
  profile_path: string;
};

export type Movie = {
  _id: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: Genre[];
  casts: Cast[];
  release_date: string;
  original_language: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
};

type ShowState = {
  movie: Movie;
  dateTime: typeof dummyDateTimeData;
};

const MoviesDetails = () => {
  const navigate = useNavigate();

  
  const {id}=useParams<{id: string}>();
  const [show, setShow] = useState<ShowState| null>(null);

   const dateSelectRef = useRef<HTMLDivElement | null>(null);


  const getshow = async()=>{
   const movie  = dummyShowsData.find(show => show._id === id)
   if (movie) {
     setShow({
       movie,
       dateTime: dummyDateTimeData
     })
   } else {
     setShow(null)
   }
  }

  useEffect(()=>{
    getshow()
  },
[id]);

const handleScrollToDateSelect = () => {
    dateSelectRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
  
  return show ? (
    <div className='px-6 md:px-6  lg:px-40 pt-30 md:pt-50 '>
      <div className='flex flex-row'>
        <img src={show.movie.poster_path} alt="" className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' />
        <div className='relative flex flex-col m-6 gap-3 '>
          <BlurCircle top='-100px' left='-100px' />
          <p className='text-primary'>English</p>
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>

          <div className='flex flex-row items-center' >
            <StarIcon width={15} className='text-primary fill-primary'/>
        
            <p className='text-gray-400'>{show.movie.vote_average} IMDb Rating </p>

          </div>
          <p className='w-3/5 text-gray-400'>{show.movie.overview}</p>
          <div className='flex gap-1 text-gray-400'>
            <div>{show.movie.runtime} min</div>•
            <div>{show.movie.genres.map((genres)=>(genres.name )).slice(1,3).join(", ")}</div>•
            <div>{show.movie.release_date}</div>
          </div>
<div className="flex items-center flex-wrap gap-4 mt-4">
  <div className="flex items-center gap-2 px-7 py-3 text-sm bg-hover bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
    <PlayCircleIcon className="w-5 h-5" />
    Watch Trailer
  </div>

  <a
  onClick={handleScrollToDateSelect}
    href="#"
    className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
  >
    Buy Tickets
  </a>

  <div className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95">
    <Heart className="w-5 h-5" />
  </div>
</div>

          

        </div>
      </div>
<div className='mt-14'>
  <h1 className='text-lg font-medium '>Your Favorite Cast</h1>
  <div className='flex gap-6 overflow-x-auto no-scrollbar pb-4 mt-10'>
  {show.movie.casts.slice(0,7).map((cast) => (
    <div key={cast.name} className='flex flex-col items-center text-center'>
      <img src={cast.profile_path} alt={cast.name} className='w-25 h-20 aspect-square object-cover rounded-full' />
      <p className='font-medium text-xs mt-3'>{cast.name}</p>
    </div>
  ))}
</div>
</div>

<div ref={dateSelectRef}>
  <DateSelect dateTime={show.dateTime} id={id}/>

  <p className='text-lg font-medium mt-20 mb-8'>You May also Like </p>

  <div className='flex flex-wrap max-sm:justify-center gap-8'>
    {dummyShowsData.slice(0,4).map((movie)=>(
      <MoviesCart  movie={movie} />
    ))}
  </div>
  <div className='flex justify-center mt-20'>
    <button onClick={()=>{
      navigate('/movies');
      scrollTo(0,0);
    }}  className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'> Show More</button>

  </div>

</div>
      


    </div>
  ):(
    <div className='text-7xl font-semibold flex items-center p-25 relative left-16 mt-25'> Not any show Available </div>
  )
}

export default MoviesDetails