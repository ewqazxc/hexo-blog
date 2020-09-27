---
title: TypeScript 练习
date: 2020-09-27
---

来源：[typescript=exercises](https://typescript-exercises.github.io)

## 练习一 给定数据后，定义接口User 并相应地使用它

* 定义类型有两种方式：接口（interface）和类型别名（type alias）
  - interface只能定义对象类型，type声明的方式可以定义组合类型，交叉类型和原始类型
  - 如果用type alias 声明的方式，会导致一些功能的缺失
  - interface方式可以实现接口的extends/implements，而type 不行
  - interface可以实现接口的merge，但是type不行 

[typescript interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html#introduction)

原题：
```ts
  export type User = unknown;

  export const users: unknown[] = [
      {
          name: 'Max Mustermann',
          age: 25,
          occupation: 'Chimney sweep'
      },
      {
          name: 'Kate Müller',
          age: 23,
          occupation: 'Astronaut'
      }
  ];

  export function logPerson(user: unknown) {
      console.log(` - ${user.name}, ${user.age}`);
  }

  console.log('Users:');
  users.forEach(logPerson);
```
结果：
```ts
  // 定义User 类型
  export interface User = {
      name: string;
      age: number;
      occupation: string;
  };
  // User 类的数组
  export const users: User[] = [
      {
          name: 'Max Mustermann',
          age: 25,
          occupation: 'Chimney sweep'
      },
      {
          name: 'Kate Müller',
          age: 23,
          occupation: 'Astronaut'
      }
  ];
  // User 类的对象数据
  export function logPerson(user: User) {
      console.log(` - ${user.name}, ${user.age}`);
  }

  console.log('Users:');
  users.forEach(logPerson);
```

## 练习二 缺少`Person`类型，请定义并使用

[高级类型](https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types)

原题：
```ts
  interface User {
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      name: string;
      age: number;
      role: string;
  }

  export type Person = unknown;

  export const persons: User[] /* <- Person[] */ = [
      {
          name: 'Max Mustermann',
          age: 25,
          occupation: 'Chimney sweep'
      },
      {
          name: 'Jane Doe',
          age: 32,
          role: 'Administrator'
      },
      {
          name: 'Kate Müller',
          age: 23,
          occupation: 'Astronaut'
      },
      {
          name: 'Bruce Willis',
          age: 64,
          role: 'World saver'
      }
  ];

  export function logPerson(user: User) {
      console.log(` - ${user.name}, ${user.age}`);
  }

  persons.forEach(logPerson);
```

结果：
```ts
  interface User {
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      name: string;
      age: number;
      role: string;
  }
  export type Person = User | Admin; // 声明Person 为 User 或 Admin
  export const persons: Person[] = [
      {
          name: 'Max Mustermann',
          age: 25,
          occupation: 'Chimney sweep'
      },
      {
          name: 'Jane Doe',
          age: 32,
          role: 'Administrator'
      },
      {
          name: 'Kate Müller',
          age: 23,
          occupation: 'Astronaut'
      },
      {
          name: 'Bruce Willis',
          age: 64,
          role: 'World saver'
      }
  ];

  export function logPerson(user: Person) {
      console.log(` - ${user.name}, ${user.age}`);
  }

  persons.forEach(logPerson);
```

## 练习三 修复`logPerson`函数中的类型错误

[in 运算符](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-the-in-operator)

原题：
```ts
  interface User {
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      name: string;
      age: number;
      role: string;
  }

  export type Person = User | Admin;

  export const persons: Person[] = [
      {
          name: 'Max Mustermann',
          age: 25,
          occupation: 'Chimney sweep'
      },
      {
          name: 'Jane Doe',
          age: 32,
          role: 'Administrator'
      },
      {
          name: 'Kate Müller',
          age: 23,
          occupation: 'Astronaut'
      },
      {
          name: 'Bruce Willis',
          age: 64,
          role: 'World saver'
      }
  ];

  export function logPerson(person: Person) {
      let additionalInformation: string;
      if (person.role) {
          additionalInformation = person.role;
      } else {
          additionalInformation = person.occupation;
      }
      console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
  }

  persons.forEach(logPerson);
```
结果：
```ts
  interface User {
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      name: string;
      age: number;
      role: string;
  }

  export type Person = User | Admin;

  export const persons: Person[] = [
      {
          name: 'Max Mustermann',
          age: 25,
          occupation: 'Chimney sweep'
      },
      {
          name: 'Jane Doe',
          age: 32,
          role: 'Administrator'
      },
      {
          name: 'Kate Müller',
          age: 23,
          occupation: 'Astronaut'
      },
      {
          name: 'Bruce Willis',
          age: 64,
          role: 'World saver'
      }
  ];

  export function logPerson(person: Person) {
      let additionalInformation: string;
      if ('role' in person) { // peson 中有 role 属性
          additionalInformation = person.role;
      } else {
          additionalInformation = person.occupation;
      }
      console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
  }

  persons.forEach(logPerson);
```

## 练习四 找出如何帮助TypeScript理解 并应用必要的修正

[定义类型保护](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates)

原题：
```ts
  interface User {
      type: 'user';
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      type: 'admin';
      name: string;
      age: number;
      role: string;
  }

  export type Person = User | Admin;

  export const persons: Person[] = [
      { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
      { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
      { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
      { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
  ];

  export function isAdmin(person: Person) {
      return person.type === 'admin';
  }

  export function isUser(person: Person) {
      return person.type === 'user';
  }

  export function logPerson(person: Person) {
      let additionalInformation: string = '';
      if (isAdmin(person)) {
          additionalInformation = person.role;
      }
      if (isUser(person)) {
          additionalInformation = person.occupation;
      }
      console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
  }

  console.log('Admins:');
  persons.filter(isAdmin).forEach(logPerson);

  console.log();

  console.log('Users:');
  persons.filter(isUser).forEach(logPerson);
```
结果：
```ts
  interface User {
      type: 'user';
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      type: 'admin';
      name: string;
      age: number;
      role: string;
  }

  export type Person = User | Admin;

  export const persons: Person[] = [
      { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
      { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
      { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
      { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
  ];

  export function isAdmin(person: Person): person is Admin { // 返回 peson 是 Admin 类型
      return person.type === 'admin';
  }

  export function isUser(person: Person): person is User { // 返回 peson 是 User 类型
      return person.type === 'user';
  }

  export function logPerson(person: Person) {
      let additionalInformation: string = '';
      if (isAdmin(person)) {
          additionalInformation = person.role;
      }
      if (isUser(person)) {
          additionalInformation = person.occupation;
      }
      console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
  }

  console.log('Admins:');
  persons.filter(isAdmin).forEach(logPerson);

  console.log();

  console.log('Users:');
  persons.filter(isUser).forEach(logPerson);
```

## 练习五 从过滤条件中排除“类型”

[映射类型](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)
[预定义的条件类型](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)

原题：
```ts
  interface User {
      type: 'user';
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      type: 'admin';
      name: string;
      age: number;
      role: string;
  }

  export type Person = User | Admin;

  export const persons: Person[] = [
      { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
      {
          type: 'admin',
          name: 'Jane Doe',
          age: 32,
          role: 'Administrator'
      },
      {
          type: 'user',
          name: 'Kate Müller',
          age: 23,
          occupation: 'Astronaut'
      },
      {
          type: 'admin',
          name: 'Bruce Willis',
          age: 64,
          role: 'World saver'
      },
      {
          type: 'user',
          name: 'Wilson',
          age: 23,
          occupation: 'Ball'
      },
      {
          type: 'admin',
          name: 'Agent Smith',
          age: 23,
          role: 'Administrator'
      }
  ];

  export const isAdmin = (person: Person): person is Admin => person.type === 'admin';
  export const isUser = (person: Person): person is User => person.type === 'user';

  export function logPerson(person: Person) {
      let additionalInformation = '';
      if (isAdmin(person)) {
          additionalInformation = person.role;
      }
      if (isUser(person)) {
          additionalInformation = person.occupation;
      }
      console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
  }

  export function filterUsers(persons: Person[], criteria: User): User[] {
      return persons.filter(isUser).filter((user) => {
          const criteriaKeys = Object.keys(criteria) as (keyof User)[];
          return criteriaKeys.every((fieldName) => {
              return user[fieldName] === criteria[fieldName];
          });
      });
  }

  console.log('Users of age 23:');

  filterUsers(
      persons,
      {
          age: 23
      }
  ).forEach(logPerson);

```
结果：
```ts
  interface User {
      type: 'user';
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      type: 'admin';
      name: string;
      age: number;
      role: string;
  }

  export type Person = User | Admin;

  export const persons: Person[] = [
      { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
      {
          type: 'admin',
          name: 'Jane Doe',
          age: 32,
          role: 'Administrator'
      },
      {
          type: 'user',
          name: 'Kate Müller',
          age: 23,
          occupation: 'Astronaut'
      },
      {
          type: 'admin',
          name: 'Bruce Willis',
          age: 64,
          role: 'World saver'
      },
      {
          type: 'user',
          name: 'Wilson',
          age: 23,
          occupation: 'Ball'
      },
      {
          type: 'admin',
          name: 'Agent Smith',
          age: 23,
          role: 'Administrator'
      }
  ];

  export const isAdmin = (person: Person): person is Admin => person.type === 'admin';
  export const isUser = (person: Person): person is User => person.type === 'user';

  export function logPerson(person: Person) {
      let additionalInformation = '';
      if (isAdmin(person)) {
          additionalInformation = person.role;
      }
      if (isUser(person)) {
          additionalInformation = person.occupation;
      }
      console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
  }

  // Omi<T,K> 类型让我们可以从另一个对象类型中剔除默写属性，并返回一个新的对象类型 因为是过滤User，所以结果去除下type
  // Partial 将对象类型 中的key 变为可选项
  export function filterUsers(persons: Person[], criteria: Partial<Omit<User, 'type'>>): User[] {
      return persons.filter(isUser).filter((user) => {
          const criteriaKeys = Object.keys(criteria) as (keyof Omit<User, 'type'>)[];
          return criteriaKeys.every((fieldName) => {
              return user[fieldName] === criteria[fieldName];
          });
      });
  }

  console.log('Users of age 23:');

  filterUsers(
      persons,
      {
          age: 23
      }
  ).forEach(logPerson);
```

## 练习六 过滤任何类型的人

[重载](https://www.typescriptlang.org/docs/handbook/functions.html#overloads)

原题：
```ts
  interface User {
      type: 'user';
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      type: 'admin';
      name: string;
      age: number;
      role: string;
  }

  export type Person = User | Admin;

  export const persons: Person[] = [
      { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
      { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
      { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
      { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
      { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
      { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
  ];

  export function logPerson(person: Person) {
      console.log(
          ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
      );
  }

  export function filterPersons(persons: Person[], personType: string, criteria: unknown): unknown[] {
      return persons
          .filter((person) => person.type === personType)
          .filter((person) => {
              let criteriaKeys = Object.keys(criteria) as (keyof Person)[];
              return criteriaKeys.every((fieldName) => {
                  return person[fieldName] === criteria[fieldName];
              });
          });
  }

  export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
  export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });

  console.log('Users of age 23:');
  usersOfAge23.forEach(logPerson);

  console.log();

  console.log('Admins of age 23:');
  adminsOfAge23.forEach(logPerson);
```
结果：
```ts
  interface User {
      type: 'user';
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      type: 'admin';
      name: string;
      age: number;
      role: string;
  }

  export type Person = User | Admin;

  export const persons: Person[] = [
      { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
      { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
      { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
      { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
      { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
      { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
  ];

  export function logPerson(person: Person) {
      console.log(
          ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
      );
  }

  // 传入类型 T，即返回的数组类型T
  const getObjectKeys = <T>(obj: T) => Object.keys(obj) as (keyof T)[];

  // 多次定义函数，最后一次进行实现
  export function filterPersons(persons: Person[], personType: 'user', criteria: Partial<Omit<User, 'type'>>): User[];
  export function filterPersons(persons: Person[], personType: 'admin', criteria: Partial<Omit<Admin, 'type'>>): Admin[];
  export function filterPersons(persons: Person[], personType: string, criteria: Partial<Person>): Person[] {
      return persons
          .filter((person) => person.type === personType)
          .filter((person) => {
              let criteriaKeys = getObjectKeys(criteria);
              return criteriaKeys.every((fieldName) => {
                  return person[fieldName] === criteria[fieldName];
              });
          });
  }

  export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
  export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });

  console.log('Users of age 23:');
  usersOfAge23.forEach(logPerson);

  console.log();

  console.log('Admins of age 23:');
  adminsOfAge23.forEach(logPerson);

```

## 练习七 交换类型

[元组](https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple)
[泛型](https://www.typescriptlang.org/docs/handbook/generics.html)

原题：
```ts
  interface User {
      type: 'user';
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      type: 'admin';
      name: string;
      age: number;
      role: string;
  }

  function logUser(user: User) {
      const pos = users.indexOf(user) + 1;
      console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`);
  }

  function logAdmin(admin: Admin) {
      const pos = admins.indexOf(admin) + 1;
      console.log(` - #${pos} Admin: ${admin.name}, ${admin.age}, ${admin.role}`);
  }

  const admins: Admin[] = [
      {
          type: 'admin',
          name: 'Will Bruces',
          age: 30,
          role: 'Overseer'
      },
      {
          type: 'admin',
          name: 'Steve',
          age: 40,
          role: 'Steve'
      }
  ];

  const users: User[] = [
      {
          type: 'user',
          name: 'Moses',
          age: 70,
          occupation: 'Desert guide'
      },
      {
          type: 'user',
          name: 'Superman',
          age: 28,
          occupation: 'Ordinary person'
      }
  ];

  export function swap(v1, v2) {
      return [v2, v1];
  }

  function test1() {
      console.log('test1:');
      const [secondUser, firstAdmin] = swap(admins[0], users[1]);
      logUser(secondUser);
      logAdmin(firstAdmin);
  }

  function test2() {
      console.log('test2:');
      const [secondAdmin, firstUser] = swap(users[0], admins[1]);
      logAdmin(secondAdmin);
      logUser(firstUser);
  }

  function test3() {
      console.log('test3:');
      const [secondUser, firstUser] = swap(users[0], users[1]);
      logUser(secondUser);
      logUser(firstUser);
  }

  function test4() {
      console.log('test4:');
      const [firstAdmin, secondAdmin] = swap(admins[1], admins[0]);
      logAdmin(firstAdmin);
      logAdmin(secondAdmin);
  }

  function test5() {
      console.log('test5:');
      const [stringValue, numericValue] = swap(123, 'Hello World');
      console.log(` - String: ${stringValue}`);
      console.log(` - Numeric: ${numericValue}`);
  }

  [test1, test2, test3, test4, test5].forEach((test) => test());

```

结果：
```ts
  interface User {
      type: 'user';
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      type: 'admin';
      name: string;
      age: number;
      role: string;
  }

  function logUser(user: User) {
      const pos = users.indexOf(user) + 1;
      console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`);
  }

  function logAdmin(admin: Admin) {
      const pos = admins.indexOf(admin) + 1;
      console.log(` - #${pos} Admin: ${admin.name}, ${admin.age}, ${admin.role}`);
  }

  const admins: Admin[] = [
      {
          type: 'admin',
          name: 'Will Bruces',
          age: 30,
          role: 'Overseer'
      },
      {
          type: 'admin',
          name: 'Steve',
          age: 40,
          role: 'Steve'
      }
  ];

  const users: User[] = [
      {
          type: 'user',
          name: 'Moses',
          age: 70,
          occupation: 'Desert guide'
      },
      {
          type: 'user',
          name: 'Superman',
          age: 28,
          occupation: 'Ordinary person'
      }
  ];

  // 通过泛型，声明返回值为交换位置后的传入参数
  export function swap<T1, T2>(v1: T1, v2: T2): [T2, T1] {
      return [v2, v1];
  }

  function test1() {
      console.log('test1:');
      const [secondUser, firstAdmin] = swap(admins[0], users[1]);
      logUser(secondUser);
      logAdmin(firstAdmin);
  }

  function test2() {
      console.log('test2:');
      const [secondAdmin, firstUser] = swap(users[0], admins[1]);
      logAdmin(secondAdmin);
      logUser(firstUser);
  }

  function test3() {
      console.log('test3:');
      const [secondUser, firstUser] = swap(users[0], users[1]);
      logUser(secondUser);
      logUser(firstUser);
  }

  function test4() {
      console.log('test4:');
      const [firstAdmin, secondAdmin] = swap(admins[1], admins[0]);
      logAdmin(firstAdmin);
      logAdmin(secondAdmin);
  }

  function test5() {
      console.log('test5:');
      const [stringValue, numericValue] = swap(123, 'Hello World');
      console.log(` - String: ${stringValue}`);
      console.log(` - Numeric: ${numericValue}`);
  }

  [test1, test2, test3, test4, test5].forEach((test) => test());
```

## 练习八 定义总的类型

[联合类型](https://www.typescriptlang.org/docs/handbook/utility-types.html)

原题：
```ts
  interface User {
      type: 'user';
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      type: 'admin';
      name: string;
      age: number;
      role: string;
  }

  type PowerUser = unknown;

  export type Person = User | Admin | PowerUser;

  export const persons: Person[] = [
      { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
      { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
      { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
      { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
      {
          type: 'powerUser',
          name: 'Nikki Stone',
          age: 45,
          role: 'Moderator',
          occupation: 'Cat groomer'
      }
  ];

  function isAdmin(person: Person): person is Admin {
      return person.type === 'admin';
  }

  function isUser(person: Person): person is User {
      return person.type === 'user';
  }

  function isPowerUser(person: Person): person is PowerUser {
      return person.type === 'powerUser';
  }

  export function logPerson(person: Person) {
      let additionalInformation: string = '';
      if (isAdmin(person)) {
          additionalInformation = person.role;
      }
      if (isUser(person)) {
          additionalInformation = person.occupation;
      }
      if (isPowerUser(person)) {
          additionalInformation = `${person.role}, ${person.occupation}`;
      }
      console.log(`${person.name}, ${person.age}, ${additionalInformation}`);
  }

  console.log('Admins:');
  persons.filter(isAdmin).forEach(logPerson);

  console.log();

  console.log('Users:');
  persons.filter(isUser).forEach(logPerson);

  console.log();

  console.log('Power users:');
  persons.filter(isPowerUser).forEach(logPerson);

```

结果：
```ts
  interface User {
      type: 'user';
      name: string;
      age: number;
      occupation: string;
  }

  interface Admin {
      type: 'admin';
      name: string;
      age: number;
      role: string;
  }

  // 联合 User 和 Admin，并指定新的type{ type: 'powerUser' }， 得到 PowerUser
  type PowerUser = Omit<User, 'type'> & Omit<Admin, 'type'> & {
      type: 'powerUser'
  };

  export type Person = User | Admin | PowerUser;

  export const persons: Person[] = [
      { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
      { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
      { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
      { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
      {
          type: 'powerUser',
          name: 'Nikki Stone',
          age: 45,
          role: 'Moderator',
          occupation: 'Cat groomer'
      }
  ];

  function isAdmin(person: Person): person is Admin {
      return person.type === 'admin';
  }

  function isUser(person: Person): person is User {
      return person.type === 'user';
  }

  function isPowerUser(person: Person): person is PowerUser {
      return person.type === 'powerUser';
  }

  export function logPerson(person: Person) {
      let additionalInformation: string = '';
      if (isAdmin(person)) {
          additionalInformation = person.role;
      }
      if (isUser(person)) {
          additionalInformation = person.occupation;
      }
      if (isPowerUser(person)) {
          additionalInformation = `${person.role}, ${person.occupation}`;
      }
      console.log(`${person.name}, ${person.age}, ${additionalInformation}`);
  }

  console.log('Admins:');
  persons.filter(isAdmin).forEach(logPerson);

  console.log();

  console.log('Users:');
  persons.filter(isUser).forEach(logPerson);

  console.log();

  console.log('Power users:');
  persons.filter(isPowerUser).forEach(logPerson);
```
