const{Client}=require('pg');

async function getConnection(){
    const client=new Client({
        host:'localhost',
        port:5432,
        user:'lolol',
        password:'casa',
        database:'negocio'
    });
    await client.connect();
    return client;}

module.exports=getConnection;