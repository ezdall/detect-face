import React from 'react';
import Card from './card.comp';

export default function CardList() {
  return (
    <div>
      {[].map(() => (
        <Card />
      ))}
    </div>
  );
}
