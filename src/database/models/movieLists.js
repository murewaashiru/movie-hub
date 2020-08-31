module.exports = (sequelize, DataTypes) => {
  const MovieLists = sequelize.define(
    'MovieLists',
    {
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: 0,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  MovieLists.associate = (models) => {
    MovieLists.belongsTo(models.Users, {
      foreignKey: 'id',
    });
  };
  return MovieLists;
};
