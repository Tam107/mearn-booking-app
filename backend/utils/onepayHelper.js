import CryptoJS from "crypto-js";

export function sortObject(obj){
    return Object.keys(obj)
        .sort()
        .reduce((result, key)=> ((result[key] = obj[key]), result),{});
}

export function generateStringToHash(params){
    return Object.entries(params)
        .filter((key, value)=> (k.startWith("vpc_") || k.startWith("user_")) && k!== "vpcSecureHash")
        .map((key, value)=> `${key}=${value}`)
        .join("&");
}

export function genSecureHash(str, secret){
    let hex = CryptoJS.enc.Hex.parse(secret);
    return CryptoJS.HmacSHA256(str, hex).toString(CryptoJS.enc.Hex).toUpperCase();
}