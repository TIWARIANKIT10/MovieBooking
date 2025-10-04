  import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { Clock } from 'lucide-react';
import BlurCircle from '../components/BlurCircle';
import screenImage from '../assets/screenImage.svg'
import toast from 'react-hot-toast';


interface Shows {
    _id: string;
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    genres: {
        id: number;
        name: string;
    }[];
    casts: {
        name: string;
        profile_path: string;
    }[];
    release_date: string;
    original_language: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
    runtime: number;

}

interface TimeSlot {
  time: string;
  showId: string;
}


interface ShowDate {
  movie :Shows,
  dateTime : {
    [key: string]: TimeSlot[];
  };

}
  const SeatLayout : React.FC = ()=> {
    const{id,date} = useParams<{ id: string; date: string }>();
    const [selectedSeats , setSelecetedSeats] = useState<string[]|null>(null);
    const [selectedTime,setSelectedTime] = useState();
    const[show,setShow] = useState<ShowDate|null>(null); 

    const navigate = useNavigate();

     const getShow = async()=>{
       const show = dummyShowsData.find(show=> show._id ===id);
       if(show){
        setShow({
          movie: show,
          dateTime: dummyDateTimeData
        }
        )
       }
     }


     const handleSeatClick = (seatId)=>{
      if(!selectedTime){
           return toast("please select the time first ");
      }

      if()

     }

     const renderSeats = (
  row: string,
  count: number,
  selectedSeats: string[],
  handleSeatClick: (seatId: string) => void
) => {
  return (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer 
                ${selectedSeats.includes(seatId) ? "bg-primary text-white" : "hover:bg-primary/20"}`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );
};

     useEffect(()=>{
      getShow()
     },[])


    return  show ? (
     
      <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
    {/* Availabe Timing */}
    <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>

      <h1 className="text-lg font-semibold px-6">Available Timings </h1>
      <div className='mt-5 space-y-1'> {date && show?.dateTime[date]?.map((item) => (
 <div
  onClick={() => setSelectedTime(item)}
  className={`flex  items-center gap-2 p-2 px-5 rounded cursor-pointer
    ${selectedTime?.time === item.time ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}
>
  <Clock className="w-4 h-4" width={15} />
  <p className="text-sm">{ new Date(item.time ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}</p>
</div>
))}</div>
   
</div>
   

  {/* seatslayout */}

  <div className='relative flex-1 flex flex-col items-center max-md:mt-16'> 
  <BlurCircle top='-100px'  left='-100px' />
  <BlurCircle top='0' right='0'/>
  <h1 className='text-2xl font-semibold mb-4'>Select your Seat</h1>
  <img src={screenImage} alt='screen'/>
  <p className='text-gray-300 text-sm mb-6 '>Screen Side</p>

  </div>
      </div>
    ):(
      <div>
        No Any show Available
      </div>
    )
  }

  export default SeatLayout