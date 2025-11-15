import { State } from "country-state-city";
import unidecode from "unidecode";

function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const cities = State.getStatesOfCountry("VN").map((city) => ({
    ...city,
    name: removeDiacritics(city.name),
}));

const searchCity = (citiesArray, value) => {
    return citiesArray.filter((city) =>
        unidecode(city.name).toLowerCase().includes(value.toLowerCase())
    );
}

const changeTime = (text) => {
    const date = new Date(text);
    return new Intl.DateTimeFormat("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Ho_Chi_Minh",
    }).format(date);
}
const isInTimeRange = (x, timeRanges) => {
    return timeRanges.some(range => {
        const [start, end] = range.split(" - ");

        if (end === "00:00") {
            const [startHour, startMinute] = start.split(":").map(Number);
            const [xHour, xMinute] = x.split(":").map(Number);

            const startTime = new Date(0, 0, 0, startHour, startMinute);
            const xTime = new Date(0, 0, 0, xHour, xMinute);

            if (xTime >= startTime) return true;

            const endHour = 6; // "06:00"
            const endMinute = 0;
            const endTime = new Date(0, 0, 0, endHour, endMinute);

            return xTime <= endTime;
        }

        const [startHour, startMinute] = start.split(":").map(Number);
        const [endHour, endMinute] = end.split(":").map(Number);
        const [xHour, xMinute] = x.split(":").map(Number);

        const startTime = new Date(0, 0, 0, startHour, startMinute);
        const endTime = new Date(0, 0, 0, endHour, endMinute);
        const xTime = new Date(0, 0, 0, xHour, xMinute);

        return xTime >= startTime && xTime <= endTime;
    });
}

export {
    removeDiacritics,
    cities,
    searchCity,
    changeTime,
    isInTimeRange
}