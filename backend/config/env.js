import {config} from 'dotenv'

// load the appropriate .env file based on NODE_ENV
config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});


export const {
    PORT,
    MONGO_URI,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_URL,
    JWT_SECRET,
    JWT_EXPIRE,
    JWT_EXPIREOTP,
    API,
    SMPT_HOST,
    SMPT_PORT,
    SMPT_MAIL,
    SMPT_PASSWORD,
    SMPT_SERVICE,
    GG_CLIENT_ID,
    GG_CLIENT_SECRET,
    GG_REDIRECT_URI,
    CLIENT_ID_PAYPAL


} = process.env