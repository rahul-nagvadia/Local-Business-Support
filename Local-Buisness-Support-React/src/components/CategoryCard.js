import React from 'react';
import '../Styles/CategoryCard.css';
export default function CategoryCard({ name, onClick}) {
  return (
    <div className="card-category" onClick={onClick}>
      <div className="card2-category">
        <div className="name">{name}</div>
      </div>
    </div>
  );
}
