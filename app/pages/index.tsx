import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';

/**
 * Index/Home page
 */
class Index extends React.Component {

  /**
   * Render the home page with navbar
   */
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