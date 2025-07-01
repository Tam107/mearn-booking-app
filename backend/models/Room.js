import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const RoomSchema = new mongoose.Schema(
  {
    RoomType: {
      type: String,
      required: true,
    },
    description:String,
    photos: {
      type: [String],
    },
    maxPeople: {
      type: Number,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServicesHotel",
      },
    ],
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    price: {
      type: Number,
    },
    priceExtra: [
      {
        start:Date,
        end:Date,
        title: Number,
      }
    ],

    facilities:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FacilitiesHotel",
      },
    ],
    // facilitiesOutstanding:[
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "FacilitiesHotel",
    //   },
    // ],
    slug: {
      type: String,
      slug: ["RoomType", "hotel.name"], // Create slug based on RoomType and hotel.name
      unique: true,  // Ensure the slug is unique
    },
    
  },

  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
