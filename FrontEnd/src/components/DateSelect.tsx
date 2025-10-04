import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon,ChevronRightIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const DateSelect = ({dateTime ,id}) => {
    const navigate = useNavigate();
    const onBookHandler = ()=>{
        if(!selected){
            return toast('please select a date')
        }
        navigate(`/movies/${id}/${selected}`)
        scrollTo(0,0);
    }

    const[selected, setSelected] = useState(null);
  return (
    <div id='dataselect' className='pt-30'>
        <div className='flex flex-col  md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
         <BlurCircle top='-100px' left='-100px'/>
         <BlurCircle top='100px' right='0'/>
         <div>
<p className='text-lg font-semibold'>
    Choose Date
</p>

<div className='flex items-center gap-6 text-sm mt-5'>
    <ChevronLeftIcon width={28}/>
    <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
        {
            Object.keys(dateTime).map((date)=>{
                const d= new Date(date);

                return (<button 
               onClick={()=> setSelected(date)} 
                key={date} className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selected ===date ? "bg-primary text-white ":"border border-primary/70" }`}>
                     <span>{d.getDate()}</span>
        <span>
          {d.toLocaleDateString("en-US", { month: "short" })}
        </span>
                </button>)
            })
        }

    </span>
     <ChevronRightIcon width={28}/>
</div>
         </div>
         <button className='bg-primary p-2 px-8 rounded-2xl' onClick={()=>{onBookHandler()}}>Book Now</button>
        </div>

    </div>
  )
}

export default DateSelect