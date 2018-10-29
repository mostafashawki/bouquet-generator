const mongoose = require('mongoose');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
//Connect to db
const db = mongoose.connect('mongodb://web-api:web-api-2018@ds143593.mlab.com:43593/bouquet-generator-db',{ useNewUrlParser: true });


// Import model
const Bouquet = require('./models/Bouquet');
const Flower = require('./models/Flower');

// Add bouquet (with 0 stock)
//@how to use ex:    node commands.js XSl5m4n3
const addBouquet = (bouquet) => {
  Bouquet.create(bouquet).then(bouquet => {
    console.info('New Bouquet Added');
  });
}

//Add flower (with 0 stock)
////@how to use ex: 
//    node commands.js 
//    XSl5m4n3
const addFlower = (flowerNew) => {
    //for simplicity I use insertMany, but we have to check first, because it has to be unique
    Flower.insertMany(flowerNew).then(flower => {
      console.info('Flowers Added');
    });
  }

 
//@desc:  Here we do two somethings:
//1- Increase flower stock by 10
//2- Generate Bouquet (increase bouquest stock), (dpending on each bouquet priority (assumed to be from data analysis & AI))
//@how to use ex: 
//     node commands.js update
//     bL,cL,aL,lS,mS,nS
const updateFlower = (flowersString) => {
  
    let flowersList = flowersString.flowerList.split(",");
    for(let i = 0; i < flowersList.length ; i++){
        Flower.findOneAndUpdate({ $and: [ { species: flowersList[i].substr(0,1) }, { size: flowersList[i].substr(1,2) } ] }, { $inc: { stock: 10 } })
        .then(() => {
            //console.info(flower);
            console.log('flower stock increased')           
        })
        .catch(err => console.log(err));//findAndUpdate flower catch
    }

    let flowersToDecrease = [];
    let bouquetSorted = [];
    //find all bouquets
    Bouquet.find()
    .then(bouquet =>{
        //sort bouquet array by priority field, to get priority to generate
        bouquetSorted = bouquet.sort((a, b) => {
 
            if(a.count === b.count)
              return a.priority > b.priority;       
          });
  
          for(let i =0; i < bouquetSorted.length; i++){
              
             for(let j = 0; j< bouquetSorted[i].flowers.length ; j++){

              let neededFlowerSpecies = bouquetSorted[i].flowers[j].species;
              let neededFlowerSize = bouquetSorted[i].size;
              let neededFlowerQty = bouquetSorted[i].flowers[j].qty;
              //go to Flower collection to get this flower
                Flower.findOne({ $and: [ { species: neededFlowerSpecies }, { size: neededFlowerSize }, { stock: { $gte: neededFlowerQty }} ] })
                  .then(flower => {
                    console.log('the flower is--------------', flower)
                      if(flower){//if flower exist, so take it from the stock (now will put it into array)
                          flowersToDecrease.push({id: flower._id, toDecrease: neededFlowerQty});
                        
                          if (j === bouquetSorted[i].flowers.length - 1){//means that all flowers stocks are enough
                            generateBouquet(bouquetSorted[i].bouquetSpec, (msg) =>{
                              console.log(msg);
                            });
                          }

                      }
                      return flowersToDecrease;
                  })
                  .then((flowersToDecrease) =>{
                    console.log('to decrease  --->',flowersToDecrease);
                    decreaseStockFlowers(flowersToDecrease, (msg) =>{
                      console.log(msg)
                    });
              })
                  .catch(err => console.log(err));//flower find catch
             
        }//for j
           
             
    }//for i
        
    })
    .catch(err => console.log(err));//findBouquet catch

  }

  const decreaseStockFlowers = (flowersToDecrease, callback) => {

     while(flowersToDecrease.length != 0){
       let flowerObj = flowersToDecrease.shift();
       console.log('to decrease ',flowerObj);
       //decrease flower stock
       Flower.findOneAndUpdate({ _id: flowerObj.id }, { $inc: { stock: - flowerObj.toDecrease } })
       .then(() => {
         console.log('flower stock decreased');
       })
       
       .catch(err => console.log(err));//Flower update stock catch
       
     }
   callback('ALL FLOWERS DECREASED');
 }

 const generateBouquet = (bouquetSpec, callback) => {
              console.log('bouquet code', bouquetSpec)
      Bouquet.findOneAndUpdate({ bouquetSpec: bouquetSpec }, { $inc: { stock: 1 } })
                         .then(() => {
                            console.log('bouquet stock increased');
                         })  
                         .catch(err => console.log(err));//Bouquet update stock catch
             
        callback('ALL BOUQUETS GENERATED');
 }



// Export All Methods
module.exports = {
  addBouquet,
  addFlower,
  updateFlower

}
