const User = require('../../models/user');
const { generateToken } = require('../../auth');

const userSignup = async (req, res) => {
    try{
        const data = req.body
        const newUser = new User(data)

        if (!newUser) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const responce = await newUser.save();
        console.log('data saved')

        const payload = {
            id: responce.id,
            username: responce.username,
            password: responce.password
        }

        const token = generateToken(payload);
        console.log("token is:" + token);
        return res.status(200).json({responce: responce, token: token})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'internal server error'});
    }
};



module.exports = userSignup;