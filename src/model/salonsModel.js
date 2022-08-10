const salons = `create table if not exists salons(
    salonid int AUTO_INCREMENT primary key, 
    vanityid varchar(255) unique not null,  
    name varchar(100) not null, 
    address varchar(255) not null, 
    city varchar(50) not null, 
    owner_name varchar(100) not null, 
    owner_quote varchar(1000) not null, 
    manpower int not null,
    rating float not null,
    best_for varchar(30),
    CONSTRAINT CHK_Rating CHECK (rating>=0 AND rating<=5),
    CONSTRAINT CHK_best_for CHECK (best_for='Male' OR best_for='Female' OR best_for='Both')
)`;

module.exports = salons;
