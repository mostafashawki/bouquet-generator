const program = require('commander');
const { prompt } = require('inquirer');

const {
  addBouquet,
  addFlower,
  updateFlower
  
} = require('./index');

//  Questions
const questions = [
  {
    type: 'input',
    name: 'bouquetSpec',
    message: 'Please Enter Bouquet Spec'
  }
 
];

const questionUpdate = [
  {
    type: 'input',
    name: 'flowerList',
    message: 'Please Enter Flowers list with , sparation e.g (aL,hS,fL....)'
  }
 
];



program
  .command('update')
  .alias('a')
  .description('Update Flower Stock (every item will increase by 20)')
  .action(() => {
    prompt(questionUpdate).then(answer => updateFlower(answer));
  });

// Add Command
program
  .command('add')
  .alias('a')
  .description('Add a bouquet sepc')
  .action(() => {
    prompt(questions).then(answer => {
      
      console.log(answer);
      let name = answer.bouquetSpec.substr(0,1).toUpperCase();
      let size = answer.bouquetSpec.substr(1,1).toUpperCase();
      // console.log('size is :-->',size);
      let flowerInBouquetSpec = [];
      let flowersInFlower = [];
      let flowerArr = answer.bouquetSpec.slice(2).split("");
      let arrayBouquetSpecToBeSorted = [];
      console.log(flowerArr);
      for (let i = 0; i <= flowerArr.length; i++){
          while (flowerArr.length != 0){
            let fSpecies = flowerArr.shift();
            flowersInFlower.push({species: fSpecies, size: size});
            let tempQty = '';
            if(!isNaN(flowerArr[0]) && !isNaN(flowerArr[1])){//two elements
              tempQty = flowerArr.splice(0,2).join('') ;
              flowerInBouquetSpec.push({species : fSpecies,qty : tempQty });
              arrayBouquetSpecToBeSorted.push(fSpecies+tempQty);
              i=i+2;
            }else{//one shift (one element only)
              tempQty = flowerArr.shift();
              flowerInBouquetSpec.push({species : fSpecies,qty : tempQty });
              arrayBouquetSpecToBeSorted.push(fSpecies+tempQty);
              i=i+1;
            }
            
          }

          
      }

      arrayBouquetSpecToBeSorted = arrayBouquetSpecToBeSorted.sort();//sort bouquet spec

  
      const bouquet = {
        bouquetSpec: name + size + arrayBouquetSpecToBeSorted.join(''),
        name: name,
        size: size,
        flowers: flowerInBouquetSpec
      }
      
      addFlower(flowersInFlower);
      addBouquet(bouquet);

    });
  });


program.parse(process.argv);