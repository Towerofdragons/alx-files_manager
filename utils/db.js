const mongo = require('mongodb');

class DBClient{
    constructor(){
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        // Connection URL and database name
        this.url = `mongodb://${host}:${port}`;
        this.dbName = database;
        this.client = new MongoClient(this.url, { useUnifiedTopology: true });

        // Connect to db
        this.client.connect()
        .then(() => {
            console.log('Connected to MongoDB');
            this.db = this.client.db(this.dbName);
        })
        .catch((error) => {
            console.error('MongoDB Connection Error:', error);
        });
    }

    // check if the MongoDB client is alive
    isAlive() {
        return this.client.isConnected && this.client.isConnected();
    }

     // Asynchronous :get the number of users
    async nbUsers() {
        if (!this.db) return 0;
        const collection = this.db.collection('users');
        return collection.countDocuments();
    }

    // Asynchronous :get the number of files
    async nbFiles() {
        if (!this.db) return 0;
        const collection = this.db.collection('files');
        return collection.countDocuments();
    }

};

 
 const dbClient = new DBClient();
 module.exports = dbClient;