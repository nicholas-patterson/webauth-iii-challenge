// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "webauth-iii",
      user: "postgres",
      password: "Password123"
    },
    useNullAsDefault: true,

    migrations: {
      directory: "./data/migrations"
    },

    seeds: {
      directory: "./data/seeds"
    }
  }
};
