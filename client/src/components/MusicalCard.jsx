import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MusicalCard.css';

export default function MusicalCard({ musical }) {
  const navigate = useNavigate();

  return (
    <div 
      className="musical-card" 
      onClick={() => navigate(`/musical/${musical.id}`)}
    >
      <img src={musical.posterUrl} alt={musical.title} className="poster-img" />
      <div className="card-info">
        <strong className="musical-title">{musical.title}</strong>
        <span className="musical-meta">{musical.genre} · {musical.venue}</span>
      </div>
    </div>
  );
}