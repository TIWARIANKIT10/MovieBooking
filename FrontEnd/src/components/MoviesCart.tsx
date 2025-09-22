import { StarIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

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

interface MoviesCartProps {
  movie: Movie;
}

const MoviesCart: React.FC<MoviesCartProps> = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:translate-y-1 transition duration-300 w-66">
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          scrollTo(0, 0);
        }}
        src={movie.backdrop_path}
        alt={movie.title}
        className="rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer"
      />

      <p className="font-semibold mt-2 truncate">{movie.title}</p>

      <p className="text-sm text-gray-400 mt-2">
        {/* ✅ Correct way to evaluate */}
        {new Date(movie.release_date).getFullYear()} •{" "}
        {movie.genres?.map((genre) => genre.name).join(", ")} • {movie.runtime} min
      </p>
      <div className="flex flex-row justify-between items-center mt-4 pb-3">
        <button className="px-4 py-1  sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"  onClick={() => {
          navigate(`/movies/${movie._id}`);
          scrollTo(0, 0);
        }} > Buy Ticket</button>
        <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1"><StarIcon width={15} className="w-4 h-4 text-primary fill-primary"/>
        {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MoviesCart;
