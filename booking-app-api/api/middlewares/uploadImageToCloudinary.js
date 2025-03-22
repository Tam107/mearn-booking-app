import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

// Access cloudinary's v2 API
const cloudinaryInstance = cloudinary.v2;

import dotenv from 'dotenv';
dotenv.config();


cloudinaryInstance.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
export const uploadImageToCloudinary = async (req, res, next) => {
  
  // next();
  // return;
    if (!req.file) {
        // console.log('No file uploaded');
        next(); 
        return ; // Continue to next middleware without image
    }
  
    try {
        
        const streamUpload = (file) => {
            return new Promise((resolve, reject) => {
              const stream = cloudinaryInstance.uploader.upload_stream((error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  console.log(error,"error1")
                  reject(error);
                }
              });
              streamifier.createReadStream(file.buffer).pipe(stream);
            });
          };
      
      const result = await streamUpload(req.file);
      req.body.public_id = result?.public_id
      req.body.file = result?.secure_url;
     
      next();
    } catch (error) {
      console.log(error,"error2")
      return res.json({
        success: false,
        message: "Error in cloudinary",
      })
    }
  };


export const deleteImg = (name)=>{
  cloudinary.api
  .delete_resources([name], 
    { type: 'upload', resource_type: 'image' })
  .then(console.log);
}

export const uploadMultipleImagesToCloudinary = async (req,res,next) => {
  const files = req.files
  if (!files || files.length === 0) {
    next(); 
    return;
  }

  const streamUpload = (file) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinaryInstance.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  };

  try {
    const uploadPromises = files.map((file) => streamUpload(file));
    const results = await Promise.all(uploadPromises);
    req.resultsImg = results
    next()
  } catch (error) {
    console.log(error,1);
    
    throw new Error(`Cloudinary Upload Error: ${error}`);
  }
};
export const deleteImgByUrl = async (url) => {
  try {
    // Extract public_id from the URL
    const matches = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/);
    if (!matches || !matches[1]) {
      throw new Error('Invalid URL format');
    }

    const publicId = matches[1]; // Extracted public_id
    console.log('Public ID:', publicId);

    // Delete the resource
    const response = await cloudinary.api.delete_resources(
      [publicId],
      { resource_type: 'image' }
    );

    console.log('Deleted resource response:', response);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

export const uploadFromUrl=async(imageUrl)=> {
  try {
      const uploadResult = await cloudinaryInstance.uploader.upload(imageUrl);
      console.log(uploadResult);
      
      // console.log("Upload từ URL thành công:", uploadResult);
      return {
          uploadResult:uploadResult,
          code:200
      };
  } catch (error) {
      // console.error("Lỗi khi upload từ URL:", error);
      return {
          code:400,
          message:"Upload failed"
      }
  }
}

    

// module.exports = {uploadImageToCloudinary,deleteImg,uploadMultipleImagesToCloudinary,deleteImgByUrl};
