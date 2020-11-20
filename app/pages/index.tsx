import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';

class Index extends React.Component {
  test = 1;
  render() {
    return (
      <>
        <Navbar />
        <div>
          <h1>DSA Web App</h1>
        </div>
      </>
    );
  }
}

export default Index;