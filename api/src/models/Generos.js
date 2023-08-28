const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Type = sequelize.define('generos', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Generos;
};
