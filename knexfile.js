const config = {
  development: {
    client: "postgresql",
    connection: {
      database: "finance_ledger",
      user: "postgres",
      password: 'password',
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: './seeds/'
  }
  }
};

module.exports = config;