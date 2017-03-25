import {Owner} from '../../dto/owner';

export class MockOwners{
    OWNERS: Owner[] = [
                       {id: 1, firstName: 'Bob', lastName: 'Dilan', country: 'USA', city: 'Chicago', phone: '7(777)777-77-77', email: 'dilan@test.com', password: 'letmein'}
                       ];
    
    login(email: string, password: string): boolean{
        let o = this.OWNERS.find(o => o.email == email);
        
        if(o == null)
            return false;
        
        if(o.email == email && o.password == password){
            return true;
        }else{
            return false;
        }
    }
    
    getOwnerByEmail(email: string): Owner{
        return this.OWNERS.find(owner => owner.email == email);
    }
    
    signup(owner: Owner): boolean{
        let o = this.OWNERS.find(o => o.email == owner.email);
        
        if(o == null){
            let maxId = 0;
            for(let i=0; i< this.OWNERS.length; i++){
                if(maxId < this.OWNERS[i].id){
                    maxId = this.OWNERS[i].id;
                }
            }
            owner.id = maxId + 1;
            this.OWNERS.push(owner);
            return true;
        }else{
            return false;
        }
    }
    
    update(owner: Owner): boolean{
        for(let i=0; i< this.OWNERS.length;i++){
            if(this.OWNERS[i].id == owner.id){
                if(this.OWNERS[i].email != owner.email && this.OWNERS.find(o => o.email == owner.email) != null){
                    return false;
                }else{
                    this.OWNERS[i] = owner;
                    return true;
                }
            }
            
        }
        return false;
    }
    
}
