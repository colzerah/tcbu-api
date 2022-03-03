import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database'): Promise<Connection> => {
  const defaultOoptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOoptions, {
      host,
    })
  );
};
