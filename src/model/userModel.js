const users = `create table if not exists users(
    userid int AUTO_INCREMENT primary key, 
    vanityid varchar(50) unique not null,  
    name varchar(255) not null, 
    email varchar(255) unique, 
    phone varchar(10) unique, 
    password varchar(255) not null, 
    city varchar(50) not null, 
    Gender varchar(20) default 'Not Mentioned', 
    budget int default 0, 
    rating int default 0 
)`;

module.exports = users;
