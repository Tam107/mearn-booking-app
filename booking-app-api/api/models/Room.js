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
    priceExtra: [],
    slug: {
      type: String,
      slug: ["RoomType", "hotel.name"], // Create slug based on RoomType and hotel.name
      unique: true,  // Ensure the slug is unique
    },
    
  },

  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
