import { Inngest } from "inngest";
import User from '../model/user.js'

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// inngest funtion to save user data to a database
const  syncUserCreation =  Inngest.createFuntion(
    {id:'sync-user-from-clerk'},
    {event:'clerk/user.created'},

    async({event})=>{
        const {id,first_name,last_name,email_addressees,image_url} = event.data

        const userDate = {
            _id :id,
            email:email_addressees[0].email_addressees,
            name:first_name+''+last_name,
            image:image_url


        }
        await User.create(userDate);

    }

)
// delet data from data base
const syncUserDeletation = Inngest.createFuntion(
    {id:'delete-user-with-clerk'},
    {
        event :'clerk/user.deleted'
    },
    async ({event})=>{
        const{id}  =event.data

        await User.findByIdAndDelete(id);


    }
)

//update data from database
const syncuserUpdation = Inngest.createFuntion(
    {
        id:'update-user-from-clerk '
    },{
        event:'clerk/user.updated'
    },
    async({event})=>{
      const {id,first_name,last_name,email_addressees,image_url} = event.data
       const userDate = {
            _id :id,
            email:email_addressees[0].email_addressees,
            name:first_name+''+last_name,
            image:image_url


        }
       await User.findByIdAndUpdate(id,{
        $set:{userDate}
       })
    }

    
)


export const functions = [syncUserCreation,syncUserDeletation];