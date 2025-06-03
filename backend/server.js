
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// app.get('/buscar-departamentos', async (req, res) => {
//   try {
//     const {
//       precioMin,
//       precioMax,
//       ambientes,
//       cochera,
//       balcon
//     } = req.query;

//     let url = `https://api.mercadolibre.com/sites/MLA/search?q=departamento%20La%20Plata&limit=50`;

//     const { data } = await axios.get(url);

//     const resultados = data.results
//       .filter((d) => {
//         const titulo = d.title?.toLowerCase() || '';
//         if (precioMin && d.price < Number(precioMin)) return false;
//         if (precioMax && d.price > Number(precioMax)) return false;
//         if (ambientes && !titulo.includes(`${ambientes} ambiente`)) return false;
//         if (cochera && !titulo.includes('cochera')) return false;
//         if (balcon && !titulo.includes('balcón')) return false;
//         return true;
//       })
//       .map(d => ({
//         titulo: d.title || 'Sin título',
//         precio: d.price,
//         ubicacion: d.location?.address_line || 'Ubicación no disponible',
//         link: d.permalink,
//         thumbnail: d.thumbnail
//       }));

//     res.json({ cantidad: resultados.length, resultados });
//   } catch (error) {
//     console.error('[ERROR AL BUSCAR DEPARTAMENTOS]', error.message);

//     res.status(500).json({
//       error: 'Error interno del servidor',
//       detalle: error.message || 'Error desconocido'
//     });
//   }
// });

app.get('/buscar-departamentos', async (req, res) => {
  // Simulamos datos
  const resultados = [
    {
      titulo: "Departamento 2 ambientes con cochera",
      precio: 85000,
      ubicacion: "Calle 10 y 50, La Plata",
      link: "https://www.mercadolibre.com.ar/departamento-fake",
      thumbnail: "https://via.placeholder.com/150"
    },
    {
      titulo: "Departamento con balcón y cochera",
      precio: 92000,
      ubicacion: "Calle 6 e/ 42 y 43, La Plata",
      link: "https://www.mercadolibre.com.ar/departamento-fake2",
      thumbnail: "https://via.placeholder.com/150"
    }
  ];

  res.json({ cantidad: resultados.length, resultados });
});

// 👉 Servir el frontend desde Express
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// app.get('/buscar-departamentos', async (req, res) => {
//   try {
//     const {
//       precioMin,
//       precioMax,
//       ambientes,
//       cochera,
//       balcon
//     } = req.query;

//     let url = `https://api.mercadolibre.com/sites/MLA/search?category=MLA1459&location=La%20Plata,Buenos%20Aires&limit=10`;

//     if (precioMin) url += `&price=${precioMin}-${precioMax || ''}`;
//     if (ambientes) url += `&attribute=BEDROOMS:${ambientes}`;
//     if (cochera) url += `&attribute=COVERED_PARKING_PLACES:1`;
//     if (balcon) url += `&attribute=HAS_BALCONY:true`;

//     const { data } = await axios.get(url);

//     const resultados = data.results.map(d => ({
//       titulo: d.title,
//       precio: d.price,
//       ubicacion: d.location.address_line || 'Ubicación no disponible',
//       link: d.permalink,
//       thumbnail: d.thumbnail
//     }));

//     res.json({ cantidad: resultados.length, resultados });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al buscar departamentos' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });
