class UserController{

    constructor(formId,tableId){
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
    }
    onSubmit(){
       
       this.formEl.addEventListener('submit',(event)=>{//arrow function
            event.preventDefault();
           //aqui, por ser arrow function ele entende que é o this de escopo de classe
            let btn = this.formEl.querySelector("[type=submit]");
            btn.disebled =true;
            
           let values = this.getValues();
           

           this.getPhoto().then(
               (content) => {
                    values.photo = content;
                    
                    this.addLine(values);
                    this.formEl.reset();
                    btn.disebled =false;

               },
              (e) => {//arrow function evita conflito do this
                if (console) {
                    console.log(e);                    }
               }
           );
           
          });
    }
//promisses vieram pra substituir o callback
//codigo com callback
/*getPhoto(callback){

    let fileReader = new FileReader();
    [...this.formEl.elements].filter(item=>{//arrayfilter filtra o array com base na condiçãogerando um novo array
       if(item.name==="photo"){
           return item;
       }
    });
    let file = elements[0].files[0];
    fileReader.onload=()=>{
        callback(fileReader.result);//assincrono
    };
    //callback é uma função de retorno pode ser uma arrow
    fileReader.readAsDataURL(file);
}*/

//promisse se der tudo certo o que fazer, e se der errado o que fazer
    getPhoto(){
        return new Promise((resolve,reject)=>{
            
        let fileReader = new FileReader();

        [...this.formEl.elements].filter(item=>{//arrayfilter filtra o array com base na condiçãogerando um novo array
           console.log(this.formEl);
            if(item.name==="photo"){
               return item;
           }
        });
        let file = elements[0].files[0];
        fileReader.onerror = (e)=>{
            reject(e);
        }
        fileReader.onload=()=>{
            resolve(fileReader.result);//assincrono
        };
        //callback é uma função de retorno pode ser uma arrow
       
       if(file){
        fileReader.readAsDataURL(file);
       }else{
        resolve('dist/img/blanck.h=jpg');   
       }
    });
    }
    addLine(dataUser){
        let tr = document.createElement('tr');
        tr.innerHTML =`
        <tr>
             <td>
               <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm">
             </td>
             <td>${dataUser.name}</td>
             <td>${dataUser.email}/td>
             <td>${(dataUser.admin)?'SIM':'NÃO'}</td> 
             <td>${dataUser.birth}/td> 
             <td>
               <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
               <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
             </td>
           </tr>`;
        document.tableEl.appendChild(tr); 
    }
    getValues(){//...spread operator ele ajuda a não precisar quantos índices o array terá
        let user = {};
        [...this.formEl.elements].forEach(function(field,index) {
           
            if(field.name=="gender"){
                if(field.checked){
                    user[field.name]= field.value;
                }
            }else{
                user[field.name]= field.value;
        
            }
        });
        return   new User(user.name,
            user.gender,
            user.birth,
            user.county,
            user.emil,
            user.password,
            user.photo,
            user.admin);
           
    }
   
}