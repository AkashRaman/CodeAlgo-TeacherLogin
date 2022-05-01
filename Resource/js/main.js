'use strict';

const store = document.getElementById('name');

const emailBox = document.getElementById('email-box');
const passwordBox = document.getElementById('password-box');
const form = document.querySelector('.form');
const btnLogin = document.querySelector('#btn-login');
const btnCWSignup = document.querySelector('#btn-cwsignup');
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
// },
// {
//     type: 'teacher',
//     firstName: 'Jayaraman',
//     lastName: '',
//     email: 'jayaraman@gmail.com',
//     password: 'codealgo',
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
        form.addEventListener('keypress', this._checkingByEntering.bind(this));
        btnLogin.addEventListener('click', this._checkingByClicking.bind(this));
        btnCWSignup.addEventListener('click', this._locationToSignup.bind(this));
    }
    
    _locationToSignup(e){
        e.preventDefault();
        location.href = "https://akashraman.github.io/CodeAlgo-TeacherSignup/"
    }

    _getLocalStorage(){
        this.#currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
        this.#accounts = JSON.parse(localStorage.getItem('accounts'));
        console.log(this.#accounts);
        console.log(this.#currentAccount);
    }

    _checkingByClicking(e){
        e.preventDefault();
        const email = emailBox.value;
        const password = passwordBox.value;

        if(!(email&&password)){
            alert("Enter every details");
            return ;
        }

        this._setCurrentAccount(email,password);
    }

    _checkingByEntering(e){
        if(e.keyCOde === 13){
            e.preventDefault();
    
            const email = emailBox.value;
            const password = passwordBox.value;
            
            if (emailBox === document.activeElement){
                passwordBox.focus();
                return ;
            }
            
            this._setCurrentAccount(email,password);
        }
    }

    _setCurrentAccount(email,password){

        if (!email.includes('@')){
            alert('Invalid Email');
            return;
        }

        if(!this.#accounts){
            alert('There is no matching account');
            return ;
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
        location.href = "https://akashraman.github.io/CodeAlgo/";
    }
}

const d = new Database();
