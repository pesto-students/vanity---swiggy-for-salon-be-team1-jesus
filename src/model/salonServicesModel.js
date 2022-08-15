const salonServices = `CREATE TABLE IF NOT EXISTS services (
    serviceid int auto increment,
    salonid int not null,
    service varchar(255) not null,
    subservice varchar(255) not null,
    price int not null,
    PRIMARY KEY (serviceid),
    FOREIGN KEY (salonid) REFERENCES salons(salonid)
)`;

module.exports = salonServices;
