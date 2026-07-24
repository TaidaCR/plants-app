import mongoose from 'mongoose'

export const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Conectado a Mongo DB Atlas')
    }catch (error){
        console.error('Error', error)
        process.exit(1)
    }
}