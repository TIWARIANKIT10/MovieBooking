import { ArrowRight } from "lucide-react";
import BlurCircle from "./BlurCircle";
import { useNavigate } from "react-router-dom";
import MoviesCart from "./MoviesCart";
import { dummyShowsData } from "../assets/assets";

const FeatureSection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        {/* Section Title */}
        <BlurCircle top="0" right="-80px"  />
        <p className="text-gray-300 font-medium text-lg">
          Now Showing
        </p>

        {/* View All Button with BlurCircle underneath */}
        <div className="relative">
          {/* Decorative Blur Circle under button */}
          

          <button onClick={() => navigate("/movies")}>
            <div className="flex items-center gap-2 group text-white font-medium relative z-10">
              View All
              <ArrowRight className="group-hover:translate-x-0.5 transition w-4.5 h-4.5" />
            </div>
          </button>
        </div>
      </div>

      <div className="flex  max-sm:justify-center gap-8 mt-8">
      {dummyShowsData.slice(0,4).map((show)=>(<MoviesCart key={show._id}  movie={show}/>))}
      </div>
      <div className="flex justify-center mt-20">
        <button onClick={()=>{navigate('movies'); scrollTo(0,0)}}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
          >
          show More
        </button>
      </div>
    </div>
  );
};

export default FeatureSection;
