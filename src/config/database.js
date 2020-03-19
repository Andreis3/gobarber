module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'gobarberDB',
  password: 'postgres',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
