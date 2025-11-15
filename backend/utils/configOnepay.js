// config.js
export const MERCHANT_PAYNOW_ID = "DUONGTT";
export const ONEPAY_MERCHANT = "TESTONEPAY";
export const MERCHANT_PAYNOW_ACCESS_CODE = "6BEB2546";
export const MERCHANT_PAYNOW_HASH_CODE = "6D0870CDE5F24F34F3915FB0045120DB";
export const BASE_URL = "https://mtf.onepay.vn/paygate/vpcpay.op";
export const ONEPAY_RETURN_URL = "http://localhost:8080/api/booking/onepay/return";
export const ONEPAY_CALLBACK_URL = "http://localhost:8080/api/booking/onepay/ipn";
export const URL_PREFIX = "/paygate/vpcpay.op?";
export  const HOST = "mtf.onepay.vn";

export default {
    MERCHANT_PAYNOW_ID,
    ONEPAY_MERCHANT,
    MERCHANT_PAYNOW_ACCESS_CODE,
    MERCHANT_PAYNOW_HASH_CODE,
    BASE_URL,
    ONEPAY_CALLBACK_URL,
    ONEPAY_RETURN_URL,
    URL_PREFIX,
    HOST,
};
