var mongoose = require ('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function(){
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true});
        
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database!');
            done();
        });
    });

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana",[-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34.1);
            expect(bici.ubicacion[1]).toEqual(-54.1);
        })
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacía', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', (done) => {
        it('Agrega solo una bici', (done) => {
            var aBici = new Bicicleta({code: 1, color:"verde", modelo: "urbana"});
            Bicicleta.add(aBici, function(err, newBici) {
                if(err) console.log(err);
                Bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);

                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('Debe devolver la bici con Code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                    
                var aBici = new Bicicleta({code: 1, color:"verde", modelo: "urbana"});
                Bicicleta.add(aBici, function(err, newBici) {
                    if(err) console.log(err);

                    var aBici2 = new Bicicleta({code: 2, color:"roja", modelo: "urbana"});
                    Bicicleta.add(aBici, function(err, newBici) {
                        if(err) console.log(err);    
                        Bicicleta.findByCode(1, function(err, targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);

                            done();
                        });
                    });
                });
            });
        });
    });

});
/*
beforeEach(() => { 
    Bicicleta.allBicis = [];
});

describe('Bicicleta.allBicis', () =>{
    it('comienza vacío', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('Agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'roja', 'urbana',[40.4705, 0.4735]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.FindById', () => {

    it('debe devolver la bici con id 1', () => {

        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1, 'roja', 'urbana');
        var aBici2 = new Bicicleta(2, 'azul', 'carretera');
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);
 
        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    });
});
*/