import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import { ArrowRightIcon, Clock } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";
import screenImage from "../assets/screenImage.svg";

interface Shows {
  _id: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  casts: { name: string; profile_path: string }[];
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
  movie: Shows;
  dateTime: {
    [key: string]: TimeSlot[];
  };
}

const SeatLayout: React.FC = () => {
  const groupRows: string[] = ["A", "B", "C", "D", "E", "F", "G"];
  const { id, date } = useParams<{ id: string; date: string }>();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [show, setShow] = useState<ShowDate | null>(null);
  const navigate = useNavigate();

  const getShow = async () => {
    const foundShow = dummyShowsData.find((show) => show._id === id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  const handleSeatClick = (seatId: string) => {
    if (!selectedTime) {
      return toast("Please select a time first!");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can only select up to 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeatRow = (row: string, count: number) => {
    const leftBlock = Math.floor(count / 2) - 1;
    const rightBlock = Math.floor(count / 2) - 1;

    return (
      <div key={row} className="flex justify-center gap-8 mb-2">
        {/* Left Block */}
        <div className="flex gap-2">
          {Array.from({ length: leftBlock }, (_, i) => {
            const seatId = `${row}${i + 1}`;
            return (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                className={`seat ${
                  selectedSeats.includes(seatId)
                    ? "bg-primary text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {seatId}
              </button>
            );
          })}
        </div>

        {/* Aisle */}
        <div className="w-12" />

        {/* Right Block */}
        <div className="flex gap-2">
          {Array.from({ length: rightBlock }, (_, i) => {
            const seatId = `${row}${i + leftBlock + 1}`;
            return (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                className={`seat ${
                  selectedSeats.includes(seatId)
                    ? "bg-primary text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {seatId}
              </button>
            );
          })} 
        </div>
      </div>
    );
  };

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-10 pt-30">
      {/* Left Sidebar: Timings */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <h1 className="text-lg font-semibold px-6">Available Timings</h1>
        <div className="mt-5 space-y-1">
          {date &&
            show.dateTime[date]?.map((item) => (
              <div
                key={item.time}
                onClick={() => setSelectedTime(item)}
                className={`flex items-center gap-2 p-2 px-5 rounded cursor-pointer
                  ${
                    selectedTime?.time === item.time
                      ? "bg-primary text-white"
                      : "hover:bg-primary/20"
                  }`}
              >
                <Clock className="w-4 h-4" />
                <p className="text-sm">
                  {new Date(item.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Right Side: Seat Layout */}
      <div className="relative flex-1 flex flex-col items-center mt-16 md:mt-0">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="0" right="0" />
        <h1 className="text-2xl font-semibold mb-4">Select Your Seat</h1>

        {/* Curved Screen */}
        <div className="w-[90%] h-4 rounded-t-[100%] bg-gray-500 mb-2" />
        <p className="text-gray-400 text-xs mb-8">SCREEN THIS SIDE</p>

        {/* Seats */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          {groupRows.map((row) => renderSeatRow(row, 12))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-700 rounded"></div> <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded"></div> <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-600 rounded"></div> <span>Booked</span>
          </div>
        </div>
        <div>
        <button className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:sclae-95">
        proceed to checkout
        <ArrowRightIcon strokeWidth={3} className="w-4 h-4"/>
      </button>
      </div>
      </div>
      
      
    </div>
    
  ) : (
    <div>No show available</div>
  );
};

export default SeatLayout;
