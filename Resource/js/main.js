'use strict';

const store = document.getElementById('name');

const emailBox = document.getElementById('email-box');
const regnoBox = document.getElementById('regno-box');
const passwordBox = document.getElementById('password-box');
const form = document.querySelector('.form');
const btnLogin = document.querySelector('#btn-login');

// const guest = {
//     name: 'Guest',
//     email: 'unknown',
//     password: 'unknown'
// }
// localStorage.clear()
// localStorage.setItem('accounts',JSON.stringify([{
//     type: 'student',
//     firstName: 'Akash',
//     lastName: 'Raman',
//     email: 'akashramanj.csbs2020@citchennai.net',
//     password: '083020codealgo',
//     regno: 210420244021
// },
// {
//     type: 'student',
//     firstName: 'Sai',
//     lastName: 'Subash',
//     email: 'saisubash.csbs2020@citchennai.net',
//     password: '083020codealgo',
//     regno: 210420244021
// },
// {
//     type: 'teacher',
//     firstName: 'Akshay',
//     lastName: 'Raman',
//     email: 'akshayramanj.csbs2020@citchennai.net',
//     password: '083020codealgo',
// }]))

// class Account {
//     firstName;
//     lastName;
//     email;
//     password;
//     constructor(firstName, lastName, email, password){
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.password = password;
//      }
//  }
  
//   class Student extends Account {
//     type = 'student';
//     regno;
//     constructor(firstName, lastName, email, password, regno) {
//       super(firstName, lastName, email, password);
//       this.regno = regno;
//     }
//   }
  
///   class Teacher extends Account {
//     type = 'teacher';
//     constructor(firstName, lastName, email, password) {
//       super(firstName, lastName, email, password);
//     }
//   }
  

class Database {
    #accounts;
    #currentAccount;
    constructor(){
        this._getLocalStorage();
        form.addEventListener('submit', this._checkingByEntering.bind(this));
        btnLogin.addEventListener('click', this._checkingByClicking.bind(this));
    }
    
    _getLocalStorage(){
        this.#currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
        this.#accounts = JSON.parse(localStorage.getItem('accounts'));
        
    }

    _checkingByClicking(e){
        e.preventDefault();
        const email = emailBox.value;
        const password = passwordBox.value;

        if(!(email&&password)){
            alert("Enter every details");
            return ;
        }

        this._setCurrentAccount(email,regno,password);
    }

    _checkingByEntering(e){
        e.preventDefault();

        const email = emailBox.value;
        const password = passwordBox.value;
        
        if (emailBox === document.activeElement){
            passwordBox.focus();
            return ;
        }
        
        this._setCurrentAccount(email,password);
    }

    _setCurrentAccount(email,password){

        if (!email.includes('@')){
            alert('Invalid Email');
            return;
        }

        const foundedAccount = this.#accounts.find(
            account => (account.type == 'teacher' && account.email === email && account.password === password)
          );

        if(!foundedAccount){
            alert('There is no matching account');
            return ;
        }

        this.#currentAccount = foundedAccount;
        localStorage.removeItem('currentAccount')
        localStorage.setItem('currentAccount',JSON.stringify(this.#currentAccount));
    }
}

const d = new Database();
