import React from 'react';

const Location = ({ city, state, country, onCityChange, onStateChange, onCountryChange }) => {
  return (
    <div>
      <h1>Enter Your Location</h1>
      <form>
        <label htmlFor="city">City:</label>
        <input type="text" id="City" value={city} onChange={onCityChange} required />

        <label htmlFor="state">State:</label>
        <input type="text" id="State" value={state} onChange={onStateChange} required />

        <label htmlFor="country">Country:</label>
        <input type="text" id="Country" value={country} onChange={onCountryChange} required />
      </form>
    </div>
  );
};

export default Location;
