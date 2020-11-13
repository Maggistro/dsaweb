import React from 'react';
import Link from 'next/link';

class Index extends React.Component {
  test = 1;
  render() {
    return (
      <div>
        <h1>DSA Web App</h1>
        <Link href='/fight'>
          Kampf
        </Link>
      </div>
    );
  }
}

export default Index;