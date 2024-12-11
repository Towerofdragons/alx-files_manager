const db = require('../utils/db');
const redis = require('../utils/redis');

class AppController{
    static getStatus(res, req) {
        res.status(200).json({
            redis: redis.isAlive(),
            db: db.isAlive()
        });
    }

    static async getStats(res, req){
        const users = await db.countUsers();
        const files = await db.countFiles();
        res.status(200).json({ users, files });
    }


};

const appController = new AppController();

module.exports = appController;