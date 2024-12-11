const db = require('../utils/db');
const redisClient = require('../utils/redis');

class UserController{
    static async postNew(req, res) {
        const { email, password } = req.body;
    
        // Validate input
        if (!email) {
          return res.status(400).json({ error: 'Missing email' });
        }
        if (!password) {
          return res.status(400).json({ error: 'Missing password' });
        }
    
        // Check if it exists
        const user = await db.User.findOne({ email });
        if (user) {
          return res.status(400).json({ error: 'Already exist' });
        }
    
        // Hash the password using SHA1
        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
    
        // Create and save the new user
        const newUser = new db.User({
          email,
          password: hashedPassword,
        });
    
        try {
          await newUser.save();
          res.status(201).json({ id: newUser._id, email: newUser.email });
        } catch (error) {
          res.status(500).json({ error: 'Unable to create user' });
        }
      }

    static async getMe(req, res) {
        const token = req.header('X-Token');
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const key = `auth_${token}`;
        const userId = await redisClient.get(key);

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await dbClient.db.collection('users').findOne({ _id: dbClient.client.ObjectId(userId) });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        return res.status(200).json({ id: user._id.toString(), email: user.email });
        }

    
};

const userController = new UserController();
module.exports= UserController;