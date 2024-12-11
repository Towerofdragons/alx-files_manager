const db = require('../utils/db');
const redis = require('../utils/redis');

class AppController{
    static getStatus(req, res) {
        res.status(200).json({
            redis: redis.isAlive(),
            db: db.isAlive()
        });
    }

    static async getStats(req, res){
        const users = await db.nbUsers();
        const files = await db.nbFiles();
        res.status(200).json({ 
            users : users, 
            files : files 
        });
    }
};

// const appController = new AppController();

module.exports = AppController;