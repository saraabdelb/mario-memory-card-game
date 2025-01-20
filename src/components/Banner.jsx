import React from 'react';

function Banner() {
  return (
    <section className="banner">
      <div className="container">
        <label htmlFor="intro" className="sr-only">
        Enter your message:
        </label>
        <input type="text" name="intro" placeholder="Wahoo! Ready to play?"  className="mario-input" />
      </div>
    </section>
  );
}

export default Banner;

