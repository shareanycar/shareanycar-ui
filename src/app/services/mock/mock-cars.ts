import {Car} from '../../dto/car';
 

export class MockCars{
    CARS: Car[] = [
                   {id: 10, name: 'toyota camry', description: 'new toyota', year: 2011, country: 'Russia', city: 'Moscow', brand: 'toyota', model: 'camry'},
                   {id: 11, name: 'mersedes benz 2016', description: 'new car', year: 2011, country: 'Russia', city: 'Moscow', brand: 'mersedes',model: 's600'}
                  ];

    getAll(): Car[]{
            return this.CARS;
    }
    
    get(id: number): Car {
        console.log("calling get");
        let c;
        if(id == null){
            c =  new Car;
        }else{
            c = this.CARS.find(car => car.id == id);
        }
        
        return c;
    }
    
    save(car: Car): void{
        console.log("calling save");
        if(car.id != null){
            console.log('saving car with id = ' + car.id);
          for(let i=0;i< this.CARS.length;i++){
              if(car.id == this.CARS[i].id){
                  this.CARS[i] = car;
                  return;
              }
          }
        }else{
            let maxId = 0;
            for(let i=0;i< this.CARS.length;i++){
                if(maxId < this.CARS[i].id){
                    maxId = this.CARS[i].id;
                }
            }
            car.id = maxId + 1;
            this.CARS.push(car);
        }    
    }
    
    delete(car: Car): void{
        if(car.id != null){
            for(let i=0;i< this.CARS.length;i++){
                if(car.id == this.CARS[i].id){
                    this.CARS.splice(i);
                    return;
                }
            }
        }
    }
}
        
