const express = require('express');
const database = require('./database');
const server = express();

server.use(express.json());

server.use((req, res, next) =>{
    res.header('Acess-Control-Allow-Origin', "*");
    res.header('Acess-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Acess-Control-Allow-Headers', 'Content-Type');
    next();
});

server.get('/',(req,res)=>{
    return res.json({result: 'API-with-data-base'});
});

server.get('/users', async (req,res)=>{

    let users;

   await database.query(`SELECT * FROM users`, {type: database.QueryTypes.SELECT})
        .then(results =>{
            users = results;
        }) .catch(error =>{
            return res.json('erro ao buscar usuários')
        })

        return res.json(users);
});

server.post('/users', async (req,res)=>{

    let inseriu;

    const{id, name, age, email, phone} = req.body;

    await database.query(`INSERT INTO users_data VALUES(${id},${name},${age},${email},${phone})`, {type: database.QueryTypes.INSERT})
    .then(result =>{
        inseriu = result
    }) .catch(error =>{
        res.json('erro ao inserir dado');
    })
    return res.json(inseriu);
});

server.delete('/users', async(req,res)=>{

    let deletou;

    const{id,name,age,email,phone} = req.body;

    await database.query(`DELETE FROM users WHERE(${id},${name},${age},${email},${phone})`, {type:database.QueryTypes.DELETE})
    .then(result=>{
        deletou = result
    }) .catch(error=>{
        res.json('erro ao deletar dado');
    })
    return res.json(deletou);
});

server.put('/users', async(req,res)=>{
    
    let atualizou;

    const{id,name,age,email,phone} = req.body;

    await database.query(`UPDATE users SET(name=${name},age=${age},email=${email},phone=${phone}) WHERE(id=${id})`, {type:database.QueryTypes.UPDATE})
    .then(result=>{
        atualizou=result
    }) .catch(error=>{
        res.json('erro ao atualizar dado');
    })
    return res.json(atualizou);
});

server.listen(process.env.PORT);