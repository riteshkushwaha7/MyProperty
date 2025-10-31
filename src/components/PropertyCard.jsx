import React from 'react'

export default function PropertyCard({ p, onView }) {
  return (
    <div className="property-card">
      <img src={p.image} alt={p.name} />
      <div className="card-body">
        <h3>{p.name}</h3>
        <p className="muted">{p.type} • {p.location}</p>
  <p className="price">₹{p.price.toLocaleString('en-IN')}</p>
        <p className="desc">{p.description.substring(0, 100)}{p.description.length>100? '...' : ''}</p>
        <div className="card-actions">
          <button onClick={()=>onView(p)}>View</button>
        </div>
      </div>
    </div>
  )
}
