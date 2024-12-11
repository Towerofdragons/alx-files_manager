const redis = require('../utils/redis');
const db = require('../utils/db');

const uuid = require(uuid);

const sha1 = require('sha1');


class AuthController{

    async getConnect(request, response){
        const header = request.header('Authorization');


        const credentials = header.split(' ');
        const userEmail = credentials[1];

        const decodedCredentials = Buffer.from(base64Credentials, 'base64');
        const [email, password] = decodedCredentials.split(':');


        if (!email || !password) {
            return res.status(401).send({ error: 'Unauthorized' });
          }
      
          // Hash the password and search for the user in the database
          const hashedPassword = sha1(password);
          const user = dbClient.db.collection('users').findOne({ email, password: hashedPassword });
      
          if (!user) {
            return res.status(401).send({ error: 'Unauthorized' });
          }
      
          // Generate token and store in Redis
          const token = uuidv4();
          const key = `auth_${token}`;
          await redisClient.set(key, user._id.toString(), 86400);
      
          return res.status(200).json({ token });
    }

    async getDisconnect(req, res) {
        const token = req.header('X-Token');
        if (!token) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
    
        const key = `auth_${token}`;
        const userId = await redisClient.get(key);
    
        if (!userId) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
    
        await redisClient.del(key);
        return res.status(204).send();
    }

};

const authController = AuthController();
module.exports = authController;