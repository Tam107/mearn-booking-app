import mongoose from "mongoose";

const BusTypeSchema = new mongoose.Schema({
    isTwoWay:{
        type:String,
        default:"false"
    },
    numberPassenger:{
        type:Number,
    },
    location: {
        type: [String],  
        validate: {
            validator: function(arr) {
                return arr.length === 2; 
            },
            message: "Location must have exactly 2 elements."
        }
    },
    company: {
        avatar: { type: String,  }, 
        name: { type: String, }
    },
    dateOfExperience: {
        type: [Date],  
        default: []   
    },
    classTime: [
        {
            depart: { type: Number, required: true, min: 0, max: 1439 },  
            arrive: { type: Number, required: true, min: 0, max: 1439 }   
        }
    ],
    price: [
        {
            date: { type: Date, required: true },  
            classTime: {
                depart: { type: Number, required: true, min: 0, max: 1439 },  
                arrive: { type: Number, required: true, min: 0, max: 1439 }   
            },
            amount: { type: Number, required: true, min: 0 }  
        }
    ],
    voucher: [
        {
            code: { type: String, unique: true, required: true },  
            percent: { type: Number, required: true, min: 0, max: 100 },  
            releaseDate: { type: Date, required: true },  
            expiryDate: { type: Date, required: true}  ,
            name:{type:String,required:true} 
        }
    ],
    type:{
        type:String,
        default:"normal" 
    },
    status:{
        type:String,
        default:"active"   
    }


    },
    {timestamps: true}
)

export default mongoose.model("BusType", BusTypeSchema);