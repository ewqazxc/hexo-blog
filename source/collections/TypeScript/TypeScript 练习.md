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
https://typescript-exercises.github.io/#exercise=8&file=%2Findex.ts

## 练习九 使用泛型定义接口返回值
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

type Person = User | Admin;

const admins: Admin[] = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];

const users: User[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
];

export type ApiResponse<T> = unknown;

type AdminsApiResponse = (
    {
        status: 'success';
        data: Admin[];
    } |
    {
        status: 'error';
        error: string;
    }
);

export function requestAdmins(callback: (response: AdminsApiResponse) => void) {
    callback({
        status: 'success',
        data: admins
    });
}

type UsersApiResponse = (
    {
        status: 'success';
        data: User[];
    } |
    {
        status: 'error';
        error: string;
    }
);

export function requestUsers(callback: (response: UsersApiResponse) => void) {
    callback({
        status: 'success',
        data: users
    });
}

export function requestCurrentServerTime(callback: (response: unknown) => void) {
    callback({
        status: 'success',
        data: Date.now()
    });
}

export function requestCoffeeMachineQueueLength(callback: (response: unknown) => void) {
    callback({
        status: 'error',
        error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
    });
}

function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

function startTheApp(callback: (error: Error | null) => void) {
    requestAdmins((adminsResponse) => {
        console.log('Admins:');
        if (adminsResponse.status === 'success') {
            adminsResponse.data.forEach(logPerson);
        } else {
            return callback(new Error(adminsResponse.error));
        }

        console.log();

        requestUsers((usersResponse) => {
            console.log('Users:');
            if (usersResponse.status === 'success') {
                usersResponse.data.forEach(logPerson);
            } else {
                return callback(new Error(usersResponse.error));
            }

            console.log();

            requestCurrentServerTime((serverTimeResponse) => {
                console.log('Server time:');
                if (serverTimeResponse.status === 'success') {
                    console.log(`   ${new Date(serverTimeResponse.data).toLocaleString()}`);
                } else {
                    return callback(new Error(serverTimeResponse.error));
                }

                console.log();

                requestCoffeeMachineQueueLength((coffeeMachineQueueLengthResponse) => {
                    console.log('Coffee machine queue length:');
                    if (coffeeMachineQueueLengthResponse.status === 'success') {
                        console.log(`   ${coffeeMachineQueueLengthResponse.data}`);
                    } else {
                        return callback(new Error(coffeeMachineQueueLengthResponse.error));
                    }

                    callback(null);
                });
            });
        });
    });
}

startTheApp((e: Error | null) => {
    console.log();
    if (e) {
        console.log(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`)
    } else {
        console.log('Success!');
    }
});
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

type Person = User | Admin;

const admins: Admin[] = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];

const users: User[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
];

export type ApiResponse<T> = { status: 'success'; data: T; } | { status: 'error'; error: string; };

export function requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
    callback({
        status: 'success',
        data: admins
    });
}

export function requestUsers(callback: (response: ApiResponse<User[]>) => void) {
    callback({
        status: 'success',
        data: users
    });
}

export function requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
    callback({
        status: 'success',
        data: Date.now()
    });
}

export function requestCoffeeMachineQueueLength(callback: (response: ApiResponse<number>) => void) {
    callback({
        status: 'error',
        error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
    });
}

function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

function startTheApp(callback: (error: Error | null) => void) {
    requestAdmins((adminsResponse) => {
        console.log('Admins:');
        if (adminsResponse.status === 'success') {
            adminsResponse.data.forEach(logPerson);
        } else {
            return callback(new Error(adminsResponse.error));
        }

        console.log();

        requestUsers((usersResponse) => {
            console.log('Users:');
            if (usersResponse.status === 'success') {
                usersResponse.data.forEach(logPerson);
            } else {
                return callback(new Error(usersResponse.error));
            }

            console.log();

            requestCurrentServerTime((serverTimeResponse) => {
                console.log('Server time:');
                if (serverTimeResponse.status === 'success') {
                    console.log(`   ${new Date(serverTimeResponse.data).toLocaleString()}`);
                } else {
                    return callback(new Error(serverTimeResponse.error));
                }

                console.log();

                requestCoffeeMachineQueueLength((coffeeMachineQueueLengthResponse) => {
                    console.log('Coffee machine queue length:');
                    if (coffeeMachineQueueLengthResponse.status === 'success') {
                        console.log(`   ${coffeeMachineQueueLengthResponse.data}`);
                    } else {
                        return callback(new Error(coffeeMachineQueueLengthResponse.error));
                    }

                    callback(null);
                });
            });
        });
    });
}

startTheApp((e: Error | null) => {
    console.log();
    if (e) {
        console.log(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`)
    } else {
        console.log('Success!');
    }
});
```

## 练习十 异步+泛型
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

type Person = User | Admin;

const admins: Admin[] = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];

const users: User[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
];

export type ApiResponse<T> = (
    {
        status: 'success';
        data: T;
    } |
    {
        status: 'error';
        error: string;
    }
);

export function promisify(arg: unknown): unknown {
    return null;
}

const oldApi = {
    requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
        callback({
            status: 'success',
            data: admins
        });
    },
    requestUsers(callback: (response: ApiResponse<User[]>) => void) {
        callback({
            status: 'success',
            data: users
        });
    },
    requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
        callback({
            status: 'success',
            data: Date.now()
        });
    },
    requestCoffeeMachineQueueLength(callback: (response: ApiResponse<number>) => void) {
        callback({
            status: 'error',
            error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
        });
    }
};

export const api = {
    requestAdmins: promisify(oldApi.requestAdmins),
    requestUsers: promisify(oldApi.requestUsers),
    requestCurrentServerTime: promisify(oldApi.requestCurrentServerTime),
    requestCoffeeMachineQueueLength: promisify(oldApi.requestCoffeeMachineQueueLength)
};

function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

async function startTheApp() {
    console.log('Admins:');
    (await api.requestAdmins()).forEach(logPerson);
    console.log();

    console.log('Users:');
    (await api.requestUsers()).forEach(logPerson);
    console.log();

    console.log('Server time:');
    console.log(`   ${new Date(await api.requestCurrentServerTime()).toLocaleString()}`);
    console.log();

    console.log('Coffee machine queue length:');
    console.log(`   ${await api.requestCoffeeMachineQueueLength()}`);
}

startTheApp().then(
    () => {
        console.log('Success!');
    },
    (e: Error) => {
        console.log(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`);
    }
);
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

type Person = User | Admin;

const admins: Admin[] = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];

const users: User[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
];

export type ApiResponse<T> = (
    {
        status: 'success';
        data: T;
    } |
    {
        status: 'error';
        error: string;
    }
);
type CallbackBasedAsyncFunction<T> = (callback: (response: ApiResponse<T>) => void) => void;
type PromiseBasedAsyncFunction<T> = () => Promise<T>;

export function promisify<T>(fn: CallbackBasedAsyncFunction<T>): PromiseBasedAsyncFunction<T> {
    return () => new Promise<T>((resolve, reject) => {
        fn((response) => {
            if (response.status === 'success') {
                resolve(response.data);
            } else {
                reject(new Error(response.error));
            }
        })
    });
}

type SourceObject<T> = {[K in keyof T]: CallbackBasedAsyncFunction<T[K]>};
type PromisifiedObject<T> = {[K in keyof T]: PromiseBasedAsyncFunction<T[K]>};
export function promisifyAll<T extends {[key: string]: any}>(obj: SourceObject<T>): PromisifiedObject<T> {
    const result: Partial<PromisifiedObject<T>> = {};
    for (const key of Object.keys(result) as (keyof T)[]) {
        result[key] = promisify(obj[key]);
    }
    return result as PromisifiedObject<T>;
}

const oldApi = {
    requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
        callback({
            status: 'success',
            data: admins
        });
    },
    requestUsers(callback: (response: ApiResponse<User[]>) => void) {
        callback({
            status: 'success',
            data: users
        });
    },
    requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
        callback({
            status: 'success',
            data: Date.now()
        });
    },
    requestCoffeeMachineQueueLength(callback: (response: ApiResponse<number>) => void) {
        callback({
            status: 'error',
            error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
        });
    }
};

export const api = promisifyAll(oldApi);

function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

async function startTheApp() {
    console.log('Admins:');
    (await api.requestAdmins()).forEach(logPerson);
    console.log();

    console.log('Users:');
    (await api.requestUsers()).forEach(logPerson);
    console.log();

    console.log('Server time:');
    console.log(`   ${new Date(await api.requestCurrentServerTime()).toLocaleString()}`);
    console.log();

    console.log('Coffee machine queue length:');
    console.log(`   ${await api.requestCoffeeMachineQueueLength()}`);
}

startTheApp().then(
    () => {
        console.log('Success!');
    },
    (e: Error) => {
        console.log(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`);
    }
);
```

## 练习十一 声明str-utils 的方法
[模块环境](https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules)

原题：
```ts
import {
    strReverse,
    strToLower,
    strToUpper,
    strRandomize,
    strInvertCase
} from 'str-utils';
```
结果：
```ts
declare module 'str-utils' {
    type StrUtil = (input: string) => string;
    export const strReverse: StrUtil;
    export const strToLower: StrUtil;
    export const strToUpper: StrUtil;
    export const strRandomize: StrUtil;
    export const strInvertCase: StrUtil;
}
```

## 练习十二 申明统计模块 避免重复类型声明

原题：
```ts
import {
    getMaxIndex,
    getMaxElement,
    getMinIndex,
    getMinElement,
    getMedianIndex,
    getMedianElement,
    getAverageValue
} from 'stats';

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

const admins: Admin[] = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'admin', name: 'Steve', age: 40, role: 'Steve' },
    { type: 'admin', name: 'Will Bruces', age: 30, role: 'Overseer' },
    { type: 'admin', name: 'Superwoman', age: 28, role: 'Customer support' }
];

const users: User[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'user', name: 'Moses', age: 70, occupation: 'Desert guide' },
    { type: 'user', name: 'Superman', age: 28, occupation: 'Ordinary person' },
    { type: 'user', name: 'Inspector Gadget', age: 31, occupation: 'Undercover' }
];

function logUser(user: User | null) {
    if (!user) {
        console.log(' - none');
        return;
    }
    const pos = users.indexOf(user) + 1;
    console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`);
}

function logAdmin(admin: Admin | null) {
    if (!admin) {
        console.log(' - none');
        return;
    }
    const pos = admins.indexOf(admin) + 1;
    console.log(` - #${pos} Admin: ${admin.name}, ${admin.age}, ${admin.role}`);
}

const compareUsers = (a: User, b: User) => a.age - b.age;
const compareAdmins = (a: Admin, b: Admin) => a.age - b.age;
const colorizeIndex = (value: number) => String(value + 1);

export {
    getMaxIndex,
    getMaxElement,
    getMinIndex,
    getMinElement,
    getMedianIndex,
    getMedianElement,
    getAverageValue
};

console.log('Youngest user:');
logUser(getMinElement(users, compareUsers));
console.log(` - was ${colorizeIndex(getMinIndex(users, compareUsers))}th to register`);

console.log();

console.log('Median user:');
logUser(getMedianElement(users, compareUsers));
console.log(` - was ${colorizeIndex(getMedianIndex(users, compareUsers))}th to register`);

console.log();

console.log('Oldest user:');
logUser(getMaxElement(users, compareUsers));
console.log(` - was ${colorizeIndex(getMaxIndex(users, compareUsers))}th to register`);

console.log();

console.log('Average user age:');
console.log(` - ${String(getAverageValue(users, ({age}: User) => age))} years`);

console.log();

console.log('Youngest admin:');
logAdmin(getMinElement(admins, compareAdmins));
console.log(` - was ${colorizeIndex(getMinIndex(users, compareUsers))}th to register`);

console.log();

console.log('Median admin:');
logAdmin(getMedianElement(admins, compareAdmins));
console.log(` - was ${colorizeIndex(getMedianIndex(users, compareUsers))}th to register`);

console.log();

console.log('Oldest admin:');
logAdmin(getMaxElement(admins, compareAdmins));
console.log(` - was ${colorizeIndex(getMaxIndex(users, compareUsers))}th to register`);

console.log();

console.log('Average admin age:');
console.log(` - ${String(getAverageValue(admins, ({age}: Admin) => age))} years`);

```
结果：
```ts index.d.ts
    declare module 'stats' {
    type Comparator<T> = (a: T, b: T) => number;

    type GetIndex = <T>(input: T[], comparator: Comparator<T>) => number;
    export const getMaxIndex: GetIndex;
    export const getMinIndex: GetIndex;
    export const getMedianIndex: GetIndex;

    type GetElement = <T>(input: T[], comparator: Comparator<T>) => T;
    export const getMaxElement: GetElement;
    export const getMinElement: GetElement;
    export const getMedianElement: GetElement;

    export const getAverageValue: <T>(input: T[], getValue: (item: T) => number) => number;
}
```

## 练习十三 补充声明文件
[环境模块](https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules)
[声明合并](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)

原题：
```ts
import * as dateWizard from 'date-wizard';
import './module-augmentations/date-wizard';

interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
    registered: Date;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
    registered: Date;
}

type Person = User | Admin;

const admins: Admin[] = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator', registered: new Date('2016-06-01T16:23:13') },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver', registered: new Date('2017-02-11T12:12:11') },
    { type: 'admin', name: 'Steve', age: 40, role: 'Steve', registered: new Date('2018-01-05T11:02:30') },
    { type: 'admin', name: 'Will Bruces', age: 30, role: 'Overseer', registered: new Date('2018-08-12T10:01:24') },
    { type: 'admin', name: 'Superwoman', age: 28, role: 'Customer support', registered: new Date('2019-03-25T07:51:05') }
];

const users: User[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep', registered: new Date('2016-02-15T09:25:13') },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut', registered: new Date('2016-03-23T12:47:03') },
    { type: 'user', name: 'Moses', age: 70, occupation: 'Desert guide', registered: new Date('2017-02-19T17:22:56') },
    { type: 'user', name: 'Superman', age: 28, occupation: 'Ordinary person', registered: new Date('2018-02-25T19:44:28') },
    { type: 'user', name: 'Inspector Gadget', age: 31, occupation: 'Undercover', registered: new Date('2019-03-25T09:29:12') }
];

const isAdmin = (person: Person): person is Admin => person.type === 'admin';
const isUser = (person: Person): person is User => person.type === 'user';

function logPerson(person: Person, index: number) {
    let additionalInformation: string = '';
    if (isAdmin(person)) {
        additionalInformation = person.role;
    }
    if (isUser(person)) {
        additionalInformation = person.occupation;
    }
    let registeredAt = dateWizard(person.registered, '{date}.{month}.{year} {hours}:{minutes}');
    let num = `#${dateWizard.pad(index + 1)}`;
    console.log(
        ` - ${num}: ${person.name}, ${person.age}, ${additionalInformation}, ${registeredAt}`
    );
}

export {
    dateWizard
};

console.log('All users:');

([] as Person[])
    .concat(users, admins)
    .forEach(logPerson);

console.log();

console.log('Early birds:');

([] as Person[])
    .concat(users, admins)
    .filter((person) => dateWizard.dateDetails(person.registered).hours < 10)
    .forEach(logPerson);
```
结果：
```ts date-wizard/index.d.ts
// This enables module augmentation mode.
import 'date-wizard';

declare module 'date-wizard' {
    // Add your module extensions here.
    const pad: (ident: number) => string;

    interface DateDetails {
        hours: number;
        minutes: number;
        seconds: number;
    }
}
```

## 练习十四 为指定的函数提供正确的类型

原题：
```ts
/**
 * 2 arguments passed: returns a new array
 * which is a result of input being mapped using
 * the specified mapper.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being mapped using original mapper.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} mapper
 * @param {Array} input
 * @return {Array | Function}
 */
export function map(mapper, input) {
    if (arguments.length === 0) {
        return map;
    }
    if (arguments.length === 1) {
        return function subFunction(subInput) {
            if (arguments.length === 0) {
                return subFunction;
            }
            return subInput.map(mapper);
        };
    }
    return input.map(mapper);
}

/**
 * 2 arguments passed: returns a new array
 * which is a result of input being filtered using
 * the specified filter function.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being filtered using original filter
 * function.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} filterer
 * @param {Array} input
 * @return {Array | Function}
 */
export function filter(filterer, input) {
    if (arguments.length === 0) {
        return map;
    }
    if (arguments.length === 1) {
        return function subFunction(subInput) {
            if (arguments.length === 0) {
                return subFunction;
            }
            return subInput.filter(filterer);
        };
    }
    return input.filter(filterer);
}

/**
 * 3 arguments passed: reduces input array it using the
 * specified reducer and initial value and returns
 * the result.
 *
 * 2 arguments passed: returns a function which accepts
 * input array and reduces it using previously specified
 * reducer and initial value and returns the result.
 *
 * 1 argument passed: returns a function which:
 *   * when 2 arguments is passed to the subfunction, it
 *     reduces the input array using specified initial
 *     value and previously specified reducer and returns
 *     the result.
 *   * when 1 argument is passed to the subfunction, it
 *     returns a function which expects the input array
 *     and reduces the specified input array using
 *     previously specified reducer and inital value.
 *   * when 0 argument is passed to the subfunction, it
 *     returns itself.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} reducer
 * @param {*} initialValue
 * @param {Array} input
 * @return {* | Function}
 */
export function reduce(reducer, initialValue, input) {
    if (arguments.length === 0) {
        return reduce;
    }
    if (arguments.length === 1) {
        return function subFunction(subInitialValue, subInput) {
            if (arguments.length === 0) {
                return subFunction;
            }
            if (arguments.length === 1) {
                return function subSubFunction(subSubInput) {
                    if (arguments.length === 0) {
                        return subSubFunction;
                    }
                    return input.reduce(reducer, subInitialValue);
                };
            }
        }
    }
    if (arguments.length === 2) {
        return function subFunction(subInput) {
            if (arguments.length === 0) {
                return subFunction;
            }
            return input.reduce(reducer, initialValue, subInput);
        };
    }
    return input.reduce(reducer, initialValue);
}

/**
 * 2 arguments passed: returns sum of a and b.
 *
 * 1 argument passed: returns a function which expects
 * b and returns sum of a and b.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number | Function}
 */
export function add(a, b) {
    if (arguments.length === 0) {
        return add;
    }
    if (arguments.length === 1) {
        return function subFunction(subB) {
            if (arguments.length === 0) {
                return subFunction;
            }
            return a + subB;
        };
    }
    return a + b;
}

/**
 * 2 arguments passed: subtracts b from a and
 * returns the result.
 *
 * 1 argument passed: returns a function which expects
 * b and subtracts b from a and returns the result.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number | Function}
 */
export function subtract(a, b) {
    if (arguments.length === 0) {
        return add;
    }
    if (arguments.length === 1) {
        return function subFunction(subB) {
            if (arguments.length === 0) {
                return subFunction;
            }
            return a - subB;
        };
    }
    return a - b;
}

/**
 * 2 arguments passed: returns value of property
 * propName of the specified object.
 *
 * 1 argument passed: returns a function which expects
 * propName and returns value of property propName
 * of the specified object.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Object} obj
 * @param {String} propName
 * @return {* | Function}
 */
export function prop(obj, propName) {
    if (arguments.length === 0) {
        return prop;
    }
    if (arguments.length === 1) {
        return function subFunction(subPropName) {
            if (arguments.length === 0) {
                return subFunction;
            }
            return obj[subPropName];
        };
    }
    return obj[propName];
}

/**
 * >0 arguments passed: expects each argument to be
 * a function. Returns a function which accepts the
 * same arguments as the first function. Passes these
 * arguments to the first function, the result of
 * the first function passes to the second function,
 * the result of the second function to the third
 * function... and so on. Returns the result of the
 * last function execution.
 *
 * 0 arguments passed: returns itself.
 *
 * TODO TypeScript
 *   * Should properly handle at least 5 arguments.
 *   * Should also make sure argument of the next
 *     function matches the return type of the previous
 *     function.
 *
 * @param {Function[]} functions
 * @return {*}
 */
export function pipe(...functions) {
    if (arguments.length === 0) {
        return pipe;
    }
    return function subFunction() {
        let nextArguments = Array.from(arguments);
        let result;
        for (const func of functions) {
            result = func(...nextArguments);
            nextArguments = [result];
        }
        return result;
    };
}

```
结果：
```ts
function toFunctional<T extends Function>(func: T): Function {
    const fullArgCount = func.length;
    function createSubFunction(curriedArgs: unknown[]) {
        return function(this: unknown) {
            const newCurriedArguments = curriedArgs.concat(Array.from(arguments));
            if (newCurriedArguments.length > fullArgCount) {
                throw new Error('Too many arguments');
            }
            if (newCurriedArguments.length === fullArgCount) {
                return func.apply(this, newCurriedArguments);
            }
            return createSubFunction(newCurriedArguments);
        };
    }
    return createSubFunction([]);
}

interface MapperFunc<I, O> {
    (): MapperFunc<I, O>;
    (input: I[]): O[];
}

interface MapFunc {
    (): MapFunc;
    <I, O>(mapper: (item: I) => O): MapperFunc<I, O>;
    <I, O>(mapper: (item: I) => O, input: I[]): O[];
}

/**
*传递了2个参数：返回一个新数组，该数组是使用指定映射器映射输入的结果。
*传递了1个参数：返回接受输入的函数，并返回一个新数组，该数组是使用原始映射器映射输入的结果。
*传递了0个参数：返回自身。
*/
export const map = toFunctional(<I, O>(fn: (arg: I) => O, input: I[]) => input.map(fn)) as MapFunc;


interface FiltererFunc<I> {
    (): FiltererFunc<I>;
    (input: I[]): I[];
}

interface FilterFunc {
    (): FilterFunc;
    <I>(filterer: (item: I) => boolean): FiltererFunc<I>;
    <I>(filterer: (item: I) => boolean, input: I[]): I[];
}

/**
*传递了2个参数：返回一个新数组，该数组是使用指定的筛选函数筛选输入的结果。
*传递了1个参数：返回接受输入的函数，并返回一个新数组，该数组是使用原始筛选函数筛选输入的结果。
*传递了0个参数：返回自身。
*/
export const filter = toFunctional(<I>(fn: (item: I) => boolean, input: I[]) => input.filter(fn)) as FilterFunc;

interface ReducerInitialFunc<I, O> {
    (): ReducerInitialFunc<I, O>;
    (input: I[]): O;
}

interface ReducerFunc<I, O> {
    (): ReducerFunc<I, O>;
    (initialValue: O): ReducerInitialFunc<I, O>;
    (initialValue: O, input: I[]): O;
}

interface ReduceFunc {
    (): ReduceFunc;
    <I, O>(reducer: (acc: O, val: I) => O): ReducerFunc<I, O>;
    <I, O>(reducer: (acc: O, val: I) => O, initialValue: O): ReducerInitialFunc<I, O>;
    <I, O>(reducer: (acc: O, val: I) => O, initialValue: O, input: I[]): O;
}

/**
*传递了3个参数：使用指定的reducer和初始值减少输入数组，并返回结果。
*传递了2个参数：返回一个函数，该函数接受输入数组并使用先前指定的reducer和初始值对其进行缩减并返回结果。
*传递了1个参数：返回一个函数，该函数：
*   当2个参数传递给子函数时，它使用指定的初始值和先前指定的reducer减少输入数组并返回结果。
*   当1个参数传递给子函数时，它返回一个需要输入数组的函数，并使用先前指定的reducer和inital值减少指定的输入数组。
*   当0参数传递给子函数时，它返回自身。
*传递了0个参数：返回自身。
*/
export const reduce = toFunctional(
    <I, O>(reducer: (acc: O, item: I) => O, initialValue: O, input: I[]) => input.reduce(reducer, initialValue)
) as ReduceFunc;

interface ArithmeticArgFunc {
    (): ArithmeticArgFunc;
    (b: number): number;
}

interface ArithmeticFunc {
    (): ArithmeticFunc;
    (a: number): ArithmeticArgFunc;
    (a: number, b: number): number;
}

/**
*传递了2个参数：返回a和b的和。
*传递了1个参数：返回一个需要b的函数，并返回a和b的和。
*传递了0个参数：返回自身。
*/
export const add = toFunctional((a: number, b: number) => a + b) as ArithmeticFunc;

/**
*传递了2个参数：从a中减去b并返回结果。
*传递了1个参数：返回一个需要b并从a中减去b并返回结果的函数。
*传递了0个参数：返回自身。
*/
export const subtract = toFunctional((a: number, b: number) => a - b) as ArithmeticFunc;

interface PropNameFunc<K extends string> {
    (): PropNameFunc<K>;
    <O extends {[key in K]: O[K]}>(obj: O): O[K];
}

interface PropFunc {
    (): PropFunc;
    <K extends string>(propName: K): PropNameFunc<K>;
    <O, K extends keyof O>(propName: K, obj: O): O[K];
}

/**
*传递了2个参数：返回指定对象的属性propName的值。
*传递了1个参数：返回一个需要propName的函数，并返回指定对象的propName属性值。
*传递了0个参数：返回自身。
*/
export const prop = toFunctional(<O, K extends keyof O>(obj: O, propName: K): O[K] => obj[propName]) as PropFunc;

type F<A extends unknown[], R> = (...args: A) => R;
type TR<I, O> = (arg: I) => O;

interface PipeFunc {
    (): PipeFunc;
    <A1 extends unknown[], R1>(f: F<A1, R1>): (...args: A1) => R1;
    <A1 extends unknown[], R1, R2>(f: F<A1, R1>, tr1: TR<R1, R2>): (...args: A1) => R2;
    <A1 extends unknown[], R1, R2, R3>(f: F<A1, R1>, tr1: TR<R1, R2>, tr2: TR<R2, R3>): (...args: A1) => R3;
    <A1 extends unknown[], R1, R2, R3, R4>(
        f: F<A1, R1>, tr1: TR<R1, R2>, tr2: TR<R2, R3>, tr3: TR<R3, R4>
    ): (...args: A1) => R4;
    <A1 extends unknown[], R1, R2, R3, R4, R5>(
        f: F<A1, R1>, tr1: TR<R1, R2>, tr2: TR<R2, R3>, tr3: TR<R3, R4>, tr4: TR<R4, R5>
    ): (...args: A1) => R5;
}

/**
*传递了>0个参数：要求每个参数都是函数。返回接受与第一个函数相同的参数的函数。将这些参数传递给第一个函数，第一个函数的结果传递给第二个函数，第二个函数的结果传递给第三个函数。。。等等。返回上次执行函数的结果。
*传递了0个参数：返回自身。
*/
export const pipe: PipeFunc = function (...functions: Function[]) {
    if (arguments.length === 0) {
        return pipe;
    }
    return function subFunction() {
        let nextArguments = Array.from(arguments);
        let result;
        for (const func of functions) {
            result = func(...nextArguments);
            nextArguments = [result];
        }
        return result;
    };
};

```

## 练习十五 声明构造对象

原题：
```ts
// Object
export class ObjectManipulator {

    constructor(protected obj) {}

    public set(key, value) {
        return new ObjectManipulator({...this.obj, [key]: value});
    }

    public get(key) {
        return this.obj[key];
    }

    public delete(key) {
        const newObj = {...this.obj};
        delete newObj[key];
        return new ObjectManipulator(newObj);
    }

    public getObject() {
        return this.obj;
    }
}

```

结果：
```ts
type ObjectWithNewProp<T, K extends string, V> = T & {[NK in K]: V};

export class ObjectManipulator<T> {
    constructor(protected obj: T) {}

    public set<K extends string, V>(key: K, value: V): ObjectManipulator<ObjectWithNewProp<T, K, V>> {
        return new ObjectManipulator({...this.obj, [key]: value} as ObjectWithNewProp<T, K, V>);
    }

    public get<K extends keyof T>(key: K): T[K] {
        return this.obj[key];
    }

    public delete<K extends keyof T>(key: K): ObjectManipulator<Omit<T, K>> {
        const newObj = {...this.obj};
        delete newObj[key];
        return new ObjectManipulator(newObj);
    }

    public getObject(): T {
        return this.obj;
    }
}
```

## [TS手册](https://www.typescriptlang.org/docs/handbook/intro.html)