import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MoviesCart from '../components/MoviesCart'
import BlurCircle from '../components/BlurCircle';


const Movies = () => {
type Movie = {
  _id: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
   // if you already have a type for casts, replace this
  release_date: string;
  original_language: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
};
  return dummyShowsData.length > 0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h[80vh]'>
      <h1 className='text-lg font-medium my-4'> Now Showing</h1>

    <BlurCircle top='150px' left='0px'/>
    <BlurCircle bottom='50px' right='50px'/>


      <div className='flex flex-wrap  max-sm:justify-center gap-8' >{
        dummyShowsData.map((movie:Movie) =>(
          <MoviesCart movie={movie} key={movie._id}/>
        ))}
      </div>
     
    </div>
  ) :(
    <div>
      No any data available
    </div>
  )

}
export default Movies