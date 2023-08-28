const { Router } = require('express');
const { Op } = require("sequelize");
const { VideoGames, Generos } = require('../db');
const axios = require('axios');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// Ruta GET /videogames
async function getAllVideoGames(req, res) {
  try {
    const videogames = await VideoGames.findAll({
      include: Generos,
    });

    res.json(videogames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los videogames.' });
  }
}

router.get('/videogames', async (req, res) => {
  try {
    const types = await Generos.findAll();
    if (types.length === 0) {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      const typesData = response.data.results;
      const createdTypes = await Generos.bulkCreate(typesData.map((type) => ({ Nombre: type.name })));
      await getAllVideoGames(req, res); // Volver a obtener todos los Pokémon
    } else {
      await getAllVideoGames(req, res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los videogames.' });
  }
});

  
  // Ruta GET /videogames/:idVideoGames
  // Ruta GET /videogames/:idVideoGames
router.get('/videogames/:idVideoGames', async (req, res) => {
  const { idVideoGames } = req.params;

  try {
    // Buscar en la base de datos por ID
    let videogame = await VideoGames.findByPk(idVideoGames, { include: Generos });

    if (!videogame) {
      // Si no se encuentra en la base de datos, buscar en la API
      const response = await axios.get(`https://pokeapi.co/api/v2/videogame/${idVideoGames}`);
      const videogameData = response.data;
      videogame = {
        id: videogameData.id,
        nombre: videogameData.name,
        imagen: videogameData.sprites.front_default,
        // Otros atributos del videogame
      };
    }

    res.json(videogame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el videogame.' });
  }
});

// Ruta GET /videogames/name?="..."
router.get('/videogames/name', async (req, res) => {
  const { name } = req.query;

  try {
    // Buscar en la base de datos por nombre (ignorando mayúsculas/minúsculas)
    let videogames = await VideoGames.findAll({
      where: {
        nombre: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: Generos,
    });

    if (videogames.length === 0) {
      // Si no se encuentran en la base de datos, buscar en la API
      const response = await axios.get(`https://pokeapi.co/api/v2/videogame?limit=1000`);
      const videogamesData = response.data.results;

      // Filtrar los videogames de la API que coincidan con el nombre buscado
      const filteredVideoGames = videogamesData.filter((videogame) =>
        videogame.name.toLowerCase().includes(name.toLowerCase())
      );

      // Obtener los detalles de cada videogame de la API
      const promises = filteredVideoGames.map(async (videogame) => {
        const response = await axios.get(videogame.url);
        const videogameData = response.data;
        return {
          id: videogameData.id,
          nombre: videogameData.name,
          imagen: videogameData.sprites.front_default,
          // Otros atributos del videogame
        };
      });

      videogames = await Promise.all(promises);
    }

    if (videogames.length > 0) {
      res.json(videogames);
    } else {
      res.status(404).json({ message: 'No se encontraron videogames con ese nombre.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar videogames por nombre.' });
  }
});

  
  // Ruta POST /videogames
  router.post('/videogames', async (req, res) => {
    const { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipos } = req.body;
  
    try {
      // Crea el videogame en la base de datos
      const videogame = await VideoGames.create({
        nombre,
        imagen,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
      });
  
      // Asocia los tipos de videogame indicados
      if (tipos && tipos.length > 0) {
        await videogame.setTypes(tipos);
      }
  
      res.status(201).json(videogame);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el videogame.' });
    }
  });
  
  // Ruta GET /types
  router.get('/types', async (req, res) => {
    try {
      const types = await Generos.findAll();
      if (types.length === 0) {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        const typesData = response.data.results;
        const createdTypes = await Generos.bulkCreate(typesData.map((type) => ({ Nombre: type.name })));
        res.json(createdTypes);
      } else {
        res.json(types);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los tipos de videogames' });
    }
  });



module.exports = router;
