import { Connection, createConnection } from "typeorm";

export class DatabaseProvider {
  private static providerInstance?: DatabaseProvider;
  private connection?: Connection;
  static getInstance() {
    if (!this.providerInstance) {
      this.providerInstance = new DatabaseProvider();
    }
    return this.providerInstance;
  }
  async getConnection() {
    if (!this.connection) {
      this.connection = await createConnection();
    }
    return this.connection;
  }
}
