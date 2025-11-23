// const mixed: (string | number)[] = [1, 'two', 3, 'four', 5];
// const gg : (string | number) = 1;
// console.log(gg);

// import { Logger } from "@nestjs/common";




// const person: [string,number] = ['Dilshodbek', 24];
// console.log(person);

 


// let numbers: readonly number[] = [1,2,3,4,5];
// console.log(numbers);
 



// enum Direction {
//     Up = 'UP',
//     Down = 'DOWN',
//     Left = 'LEFT',
//     Right = 'RIGHT'
// }



// let gg: Direction = Direction.Up;

// function move(direction: Direction) {
//     direction === "DOWN" ? console.log("You moved down") : console.log("You moved up");
//     return direction;
// }
// // console.log(gg);
// let jj = move(Direction.Up);
// console.log(jj);


// enum ResponseStatus {
//     Success = 200,
//     NotFound = 404,
//     ServerError = 500
// }

// function getResponseStatus(url: string): ResponseStatus {
//     if (url === "/") {
//         return ResponseStatus.Success;
//     } else if (url === "/not-found") {
//         return ResponseStatus.NotFound;
//     } else {
//         return ResponseStatus.ServerError;
//     }    
    
    
// }
// let statusMessage = getResponseStatus("/");
// console.log(statusMessage);


// enum websity {
//     Google = "https://www.goole.com",
//     Facebook = "https://www.faceook.com",
//     Twitter = "https://www.twiter.com"
// }

// let person: {
//     id: number
//     name: string
//     username: string
//     email: string
//     address: {
//         street: string
//         suite: string
//         city: string
//         zipcode: string | number
//         geo: [number, number]
//     }
//     phone: string
//     website: string
//     company: {
//         name: string
//         catchPhrase: string
//         bs: string
//     }
// } = {
//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//       "street": "Kulas Light",
//       "suite": "Apt. 556",
//       "city": "Gwenborough",
//       "zipcode": "92998-3874",
//       "geo": [-37.3159,81.1496],
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": websity.Facebook,
//     "company": {
//       "name": "Romaguera-Crona",
//       "catchPhrase": "Multi-layered client-server neural-net",
//       "bs": "harness real-time e-markets"
//     }
//   }
   

// let status: 'success' | 'error'; literal type


// type aliase


// type ID = string | number;
// let userId: ID = 123;
// let productId: ID = "abc123"; 
// console.log(userId, productId);



// type person = {
//     name: string;
//     age: number;
// }
//  let person: person={
//     name: 'Dilshodbek',
//     age: 24
//  }


// intersection type

// type A = {
//     name: string;
//     age: number;
// }

// type B = {
//     email: string;
//     address: string;
// }

// type C = A & B;


// type person = {
//     name: string;
//     age: number;
// }

// export type person misol uchun

// let persons: person[] = [
//     {name: 'Dilshodbek', age: 24},
//     {name: 'John', age: 30},
//     {name: 'Jane', age: 28}
// ];

// console.log(persons);

// type Logger = (message: string) => String;
// let ggDorp: Logger = (message) => {

//     console.log(message);
//     return message;
// }   
// ggDorp('Hello, world!');



// optional
// type person = {
//     name: string;
//     age?: number; // optional property
// }


// index signejer
// type Dictionary = {
//     [key: string]: string;
// }

// yani bunda kelayotgan malumot turi aniq meas shunga qanday type bolishi mumkinmligi beriladi

// unknown type
// any
// narrow type
// type asserjn yani malumot turiga sen turing shu deb qoyish
// never type

// let value: unknown = 123;
// let strLength: string = (value as string);
// console.log(strLength);


// let i :number = 0;

// function infiniteLoop(): never {

//         i++;
//         console.log(i);
//     // infiniteLoop();
// }

// infiniteLoop();


// let usernmae : string | null = null;
// // nullish coalescing operator
// let showIsernmae = usernmae ?? 'Guest';
// console.log(showIsernmae);

// type (assertion) cascting
// type guards
// Asserts





// let message: unknown = 'Hello, world!';

// // angela breaket sentax
// let strLength: number = (<string>message).length;















 











































