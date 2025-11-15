import axios from "axios";
import ExchangeRate from "../models/ExchangeRate.js";

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const FALLBACK_RATE = 27000;

export const getCurrentRate = async (req, res) => {
    try{
        // check DB first (cached rate)
        const cached =  await ExchangeRate.findOne({ from: "EUR", to: "VND" }).sort({ createdAt: -1 });
        // updateAt automatically created by mongoose timestamps
        if (cached && Date.now() - cached.updateAt <  60 * 60 * 1000) {
            return cached.rate;
        }

        // call external API
        const res = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/EUR`);
        const rate = res.data.conversion_rates.VND;

        await ExchangeRate.create({
            from: "EUR",
            to: "VND",
            rate: rate,
            source: "api",
        });
        return rate;
    }catch (error){
        throw new Error("Failed to fetch exchange rate, using fallback rate.");
        return FALLBACK_RATE;
    }
}
export default getCurrentRate;