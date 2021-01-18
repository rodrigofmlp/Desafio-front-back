const axios = require('axios').default;

class User{
    constructor(){
        this.name = document.getElementById('txtName');
        this.email = document.getElementById('txtEmail');
        this.age = document.getElementById('txtAge');
        this.phone = document.getElementById('txtPhone');
        this.btnRegister = document.getElementById('btnRegister');
        this.events();
    }

    events(){
        this.btnRegister.onclick = (event) => this.createUser();
    }

    getUsers(){
        axios.get('http://localhost:3000/users',)
        .then((result) =>{
            this.recoveryUser(result.data.users)
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    recoveryUser(data){
        for(users of data){
            const html = this.userLayout(users.name, users.age, users.email, users.phone);
            this.insertHtml(html);
        }
    }

    userLayout(name, age, email, phone){
        const html=`
            <div class="users">
                <h5>${name}</h5>
                <h5>${age}</h5>
                <h5>${email}</h5>
                <h5>${phone}</h5>
            </div>
            <br>
        `

        return html;

    }

    insertHtml(html){
        document.getElementById('usersBoard').innerHTML += html;
    }

    createUser(){
        if(this.name.value && this.email.value && this.phone.value && this.age.value){
            let user = {
                name: this.name.value,
                email: this.email.value,
                phone: this.phone.value,
                age: this.age.value
            }

            this.postUser(user);

        }else{
            alert('Favor, preencher todos os campos')
        };
    }

    postUser(user){
        axios.post('http://localhost:3000/users', user)
        .then((result) => {
            console.log(result);
    })
        .catch((error) => {
            console.log(error);
        });
    }

}

new User();