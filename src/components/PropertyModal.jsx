import React from 'react'

export default function PropertyModal({ open, property, onClose }){
  if(!open || !property) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <header>
          <h2>{property.name}</h2>
          <button className="close" onClick={onClose}>✕</button>
        </header>
        <img className="modal-image" src={property.image} alt={property.name} />
        <div className="modal-body">
          <p className="muted">{property.type} • {property.location}</p>
          <p className="price">₹{property.price.toLocaleString('en-IN')}</p>
          <p>{property.description}</p>
          {property.coords && (
            <div className="map-placeholder">
              <iframe
                title="map"
                width="100%"
                height="200"
                style={{border:0}}
                loading="lazy"
                src={`https://www.google.com/maps?q=${property.coords.lat},${property.coords.lng}&output=embed`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
