import mongoose, { mongo } from "mongoose"

mongoose.connect('mongodb+srv://Grupo-16:grupo16@cursadanodejs.ls9ii.mongodb.net/Node-js',{
    useNewUrlParser:true,
    UseUnifiedTopology:true
})
.then(()=> console.log('conexion exitosa a mongoDB'))
.catch(err=> console.log('Error al conectar mongDB', err));


const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: {type: String, require:true},
    nombreReal:{type: String},
    edad:{type:Number, min: 0},
    planetaOrigen:{type:String, default: 'desconocido'},
    debilidad: String,
    poderes: [String],
    aliados:[String],
    enemigos:[String],
    createdAt:{type:Date, default: Date.now}

}, {collection:'Grupo-16'});

const SuperHero =mongoose.model('SuperHero', superheroSchema);//modelo de carga de supers



//modelo CRUD

//insertar heroe
async function insertSuperHero() {
    const hero = new SuperHero(//creo un nuevo modelo super
        {
        "nombreSuperHeroe": "Spiderman",
        "nombreReal": "Peter Parker",
        "edad": 25,
        "planetaOrigen": "Tierra",
        "debilidad": "Radioactiva",
        "poderes": ["Trepar paredes", "Sentido arácnido", "Super fuerza", "Agilidad"],
        "aliados": ["Ironman"],
        "enemigos": ["Duende Verde"]
        });
    await hero.save();//espero a que se guarde
    console.log('Superheroe insertado con exito', hero);//muestro que se guardo con exito
}



//actualizarr heroe
async function updateSuperHero(nombreSuperHeroe) {//le paso el nombre del superHeroe a modificar
    const result = await SuperHero.updateOne(//actualizo 1 
        { nombreSuperHeroe: nombreSuperHeroe},
        {$set: {edad:26}}
    );
    console.log('resultado de actualizacion: ', result);
}


//eliminar super
async function deleteSuperHero (nombreSuperHeroe) {
    const result = await SuperHero.deleteOne({  nombreSuperHeroe: nombreSuperHeroe });
    console.log('superHeroe eliminado: ', result);
}



//buscar super
async function findSuperHero() {
    const heroes = await SuperHero.find({planetaOrigen: 'Tierra'});
    console.log('SuperHeroes encontrados: ', heroes);
}

insertSuperHero();
updateSuperHero('Spiderman');
findSuperHero();
deleteSuperHero('Spiderman');