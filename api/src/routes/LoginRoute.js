// npm install jsonwebtoken
const {Router} = require('express');
const jwt = require('jsonwebtoken');

const router = Router();
 const TOKEN_KEY = 'a';

const verifyToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];
    console.log(authHeader);
    if(token==null)
    return res.status(401).send('Token required');
    jwt.verify(token, TOKEN_KEY, (err, user) => {
        if(err)
        return res.status(403).send('Token invalid');
        console.log(user);
        req.user = user;
        next();
    });
};

router.post('/', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if(email=='john11256@hotmail.com' && password == '12345'){
        const data = {
            id:'123',
            name: 'john noreña',
            email: 'john11256@hotmail.com',
        };
        const token = jwt.sign(
            {userId:data.id, email:data.email},
            TOKEN_KEY,
            {expiresIn:'2h'}
        );
        let nData = {...data,token};
        res.status(200).send(nData)
    }else{
        res.status(400).send('credenciales incorrectas');
    };
});

router.get('/', verifyToken, (req, res) => {
    const data = [
        {id:1,client:'juan',total:2000,date:'2023-01-15'}
    ];
    res.send(data)
})

module.exports = router;