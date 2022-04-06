import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

export default function Explore() {
  return (
    <main>
      <Header />
      <Link to="/explore/foods">
        <div data-testid="explore-foods">Explore Foods</div>
      </Link>
      <Link to="/explore/drinks">
        <div data-testid="explore-drinks">Explore Drinks</div>
      </Link>
      <Footer />
    </main>
  );
}
