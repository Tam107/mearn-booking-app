import React from 'react'
import { AddressAutofill } from '@mapbox/search-js-react'

const Map = () => {
    const [value, setValue] = React.useState('');

    const handleChange = (e) => {
      setValue(e.target.value);
    };
  
    return (
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.0361201575615!2d105.7964309754886!3d20.991189180648714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acb8c586ea59%3A0x6826eb89473c9073!2zNTYgVGhhbmggWHXDom4gQuG6r2MsIFRoYW5oIFh1w6JuLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1742723562208!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    );
}

export default Map
