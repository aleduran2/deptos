
import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [form, setForm] = useState({ precioMin: '', precioMax: '', ambientes: '', cochera: false, balcon: false });
  const [resultados, setResultados] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const buscar = async () => {
    const params = new URLSearchParams();
    Object.entries(form).forEach(([key, val]) => {
      if (val) params.append(key, val);
    });
    const res = await axios.get(`http://localhost:3000/buscar-departamentos?${params}`);
    setResultados(res.data.resultados);
  };

  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Buscar Departamentos en La Plata</h1>
      <div className="grid grid-cols-2 gap-4 max-w-xl mb-4">
        <input name="precioMin" placeholder="Precio mínimo" value={form.precioMin} onChange={handleChange} className="border p-2" />
        <input name="precioMax" placeholder="Precio máximo" value={form.precioMax} onChange={handleChange} className="border p-2" />
        <input name="ambientes" placeholder="Cantidad de ambientes" value={form.ambientes} onChange={handleChange} className="border p-2" />
        <label><input type="checkbox" name="cochera" checked={form.cochera} onChange={handleChange} /> Cochera</label>
        <label><input type="checkbox" name="balcon" checked={form.balcon} onChange={handleChange} /> Balcón</label>
      </div>
      <button onClick={buscar} className="bg-blue-600 text-white px-4 py-2 rounded">Buscar</button>
      <div className="mt-6 grid gap-4">
        {resultados.map((r, i) => (
          <div key={i} className="border p-4 rounded shadow">
            <img src={r.thumbnail} alt={r.titulo} className="w-32 mb-2" />
            <h2 className="font-bold text-lg">{r.titulo}</h2>
            <p>Precio: ${r.precio}</p>
            <p>{r.ubicacion}</p>
            <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver publicación</a>
          </div>
        ))}
      </div>
    </div>
  );
}
