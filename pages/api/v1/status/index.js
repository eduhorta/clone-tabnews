import database from "../../../../infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnectionsResult.rows[0].max_connections;
  const openConnections = await database.query(
    "SELECT count(*) open_connections FROM pg_stat_activity",
  );

  response.status(200).json({
    updated_at: updatedAt,    
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: maxConnectionsValue,
        open_connections: openConnections.rows[0].open_connections,
      },
    },
  });
}

export default status;
