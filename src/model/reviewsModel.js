const reviews = `CREATE TABLE IF NOT EXISTS reviews (
    reviewid int auto_increment,
    salonid int not null,
    userid int not null,
    username varchar(255) not null,
    review varchar(1000) not null,
    rating float not null,
    PRIMARY KEY (reviewid),
    FOREIGN KEY (salonid) REFERENCES salons(salonid),
    FOREIGN KEY (userid) REFERENCES users(userid),
    CONSTRAINT CHK_Rating CHECK (rating>=0 AND rating<=5)
);`;

module.exports = reviews;
