import React, { useEffect, useState, useMemo } from 'react'
import './App.css'
import { fetchProperties, createProperty } from './api'
import PropertyCard from './components/PropertyCard'
import PropertyModal from './components/PropertyModal'
import PropertyForm from './components/PropertyForm'

function App(){
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  async function load(){
    setLoading(true)
    setError(null)
    try{
      const res = await fetchProperties()
      setProperties(res)
    }catch(err){
      setError(err.message)
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ load() }, [])

  async function handleCreate(payload){
    await createProperty(payload)
    await load()
  }

  const types = useMemo(()=>['All', ...Array.from(new Set(properties.map(p=>p.type)) )], [properties])

  const visible = useMemo(()=>{
    return properties.filter(p=>{
      if(typeFilter !== 'All' && p.type !== typeFilter) return false
      if(!query) return true
      const q = query.toLowerCase()
      return p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)
    })
  }, [properties, typeFilter, query])

  return (
    <div id="app-root">
      <header className="top">
        <h1>Property Listings</h1>
        <p className="muted">Browse, filter, and add properties (mock API)</p>
      </header>

      <section className="controls">
        <div className="search">
          <input placeholder="Search by name or location" value={query} onChange={e=>setQuery(e.target.value)} />
        </div>
        <div className="filter">
          <label>Type:</label>
          <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}>
            {types.map(t=> <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </section>

      <main className="layout">
        <div className="list">
          {loading && <p>Loading properties...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && visible.length===0 && <p>No properties found</p>}
          <div className="grid">
            {visible.map(p=> (
              <PropertyCard key={p.id} p={p} onView={setSelected} />
            ))}
          </div>
        </div>

        <aside className="aside">
          <PropertyForm onCreate={handleCreate} />
        </aside>
      </main>

      <PropertyModal open={!!selected} property={selected} onClose={()=>setSelected(null)} />
    </div>
  )
}

export default App
