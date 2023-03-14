const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platforms2: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    genres2: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    puntuations: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    image: {
      type: DataTypes.STRING,
    },
    released: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT
    },
    createdInDB:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
  },
  {timestamps: false}
  );
};

