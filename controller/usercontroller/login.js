const User = require('../../models/user');
const { generateToken } = require('../../auth');

const userLogin = async (req, res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});

        if(!user || !user.password == password){
            res.status(401).json({error: 'invalid username or password'})
        }

        const payload = {
            id: user.id,
            username: user.username,
            password: user.password
        }

        const token = generateToken(payload);

        return res.json({token});
        
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'internal server error'});
    }
};

module.exports = userLogin;