import React from 'react';
import Nav from './components/Nav';
import Banner from './components/Banner';
import CardGame from './components/CardGame';
import Footer from './components/Footer';
import Ground from './components/Ground';
import './App.css';

function App() {
  return (
    <section className="App">
      <Nav />
      <Banner /> 
      <CardGame />
      <Ground />
      <Footer />
    </section>
  );
}

export default App;
