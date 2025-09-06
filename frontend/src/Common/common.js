import { State } from "country-state-city";
import unidecode from "unidecode";

function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const cities = State.getStatesOfCountry("VN").map((city) => ({
    ...city,
    name: removeDiacritics(city.name),
}));
const searchCity = (citiesArray,value)=>{
    return citiesArray.filter((city) =>
        unidecode(city.name).toLowerCase().includes(value.toLowerCase())
    );
}
export {
    removeDiacritics,
    cities,
    searchCity
}