import {MongoClient} from 'mongodb'

const client = new MongoClient('mongodb://localhost',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

try {
    console.log('Conectando con la base de datos \"Empresa\"')
    await client.connect()
    console.log('¡Base de datos \"Empresa\" conectada existosamente!')

    const db = client.db('empresa')
    let clientes = await db.collection('clientes').find().project({nombre:1,apellido:1,_id:0}).toArray()
    console.log(clientes)

    await db.collection('productos').updateMany({},{$set:{codigo:'xxx-xxxxx'}})

    let productos = await db.collection('productos').find().project({nombre:1,precio:1,codigo:1,_id:0}).toArray()
    console.log(productos)

    client.close()
} catch (error) {
    console.log('Error durante la conexión con la Base de Datos \"Empresa\"')
    client.close()
}