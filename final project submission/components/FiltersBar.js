import { useState } from 'react';

export default function FiltersBar({ onApply, onGeo }){
  const [q,setQ]=useState('');
  const [category,setCategory]=useState('');
  const [city,setCity]=useState('');
  const [start,setStart]=useState('');
  const [end,setEnd]=useState('');
  const [radiusKm,setRadiusKm]=useState(25);

  function apply(){ onApply({ q, category, city, start, end, radiusKm }); }
  function useLocation(){
    if(!navigator.geolocation){ alert('Geolocation not supported'); return; }
    navigator.geolocation.getCurrentPosition(pos=>{
      onGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude, radiusKm });
    }, ()=>alert('Permission denied'));
  }

  return (
    <div className="card flex flex-col md:flex-row gap-2">
      <input className="input" placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)}/>
      <select className="select" value={category} onChange={e=>setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="music">Music</option>
        <option value="art">Art</option>
        <option value="sports">Sports</option>
        <option value="volunteer">Volunteer</option>
        <option value="food">Food</option>
        <option value="family">Family</option>
        <option value="misc">Misc</option>
      </select>
      <input className="input" placeholder="City" value={city} onChange={e=>setCity(e.target.value)}/>
      <input type="date" className="input" value={start} onChange={e=>setStart(e.target.value)}/>
      <input type="date" className="input" value={end} onChange={e=>setEnd(e.target.value)}/>
      <input type="number" className="input md:w-28" value={radiusKm} min="1" onChange={e=>setRadiusKm(e.target.value)}/>
      <button onClick={apply} className="btn btn-primary">Apply</button>
      <button onClick={useLocation} className="btn bg-gray-200">Use my location</button>
    </div>
  );
}
