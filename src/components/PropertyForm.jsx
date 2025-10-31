import React, { useState } from 'react'

export default function PropertyForm({ onCreate }){
  const [form, setForm] = useState({ name:'', type:'Apartment', price:'', location:'', description:'', image:'' })
  const [submitting, setSubmitting] = useState(false)

  function change(e){
    const {name, value} = e.target
    setForm(s=>({ ...s, [name]: value }))
  }

  async function submit(e){
    e.preventDefault()
    setSubmitting(true)
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      image: form.image || '/assets/placeholder.svg',
      coords: null
    }
    try{
      await onCreate(payload)
      setForm({ name:'', type:'Apartment', price:'', location:'', description:'', image:'' })
    }catch(err){
      console.error(err)
      alert('Create failed')
    }finally{ setSubmitting(false) }
  }

  return (
    <form className="property-form" onSubmit={submit}>
      <h3>Add Property</h3>
      <input name="name" value={form.name} onChange={change} placeholder="Name" required />
      <select name="type" value={form.type} onChange={change}>
        <option>Apartment</option>
        <option>House</option>
        <option>Loft</option>
        <option>Townhouse</option>
      </select>
      <input name="price" value={form.price} onChange={change} placeholder="Price" type="number" required />
      <input name="location" value={form.location} onChange={change} placeholder="Location" required />
      <input name="image" value={form.image} onChange={change} placeholder="Image URL (optional)" />
      <textarea name="description" value={form.description} onChange={change} placeholder="Description" rows={4} />
      <button type="submit" disabled={submitting}>{submitting? 'Adding...' : 'Add Property'}</button>
    </form>
  )
}
