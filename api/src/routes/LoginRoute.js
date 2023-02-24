// npm install jsonwebtoken
const {Router} = require('express');
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/', (req, res) => {
    const user = req.body.user
    const password = req.body.password
    if(user=='john' && password == '12345'){
        const data = {
            id:'123',
            name: 'john noreña',
            email: 'john11256@hotmail.com',
            codig:'asdfg'
        };
        res.status(200).send(data)
    }else{
        res.status(400).send('credenciales incorrectas');
    };
});

router.get('/', (req, res) => {
    const data = [
        {id:1,client:'juan',total:2000,date:'2023-01-15'}
    ];
    res.send(data)
})

module.exports = router;