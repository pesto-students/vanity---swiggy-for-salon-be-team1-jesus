# Vanity -- Swiggy for salons

In the post pandemic world, the beauty and skin/hair care market is highly lucrative. Salons have high wait times, ambiguity about their prices, and not enough details for the client. Vanity solves that problem by creating a Salon managing application, where users can see salons near them, what services they offer, prices on said services, and the opportunity to book an appointment without ever talking to someone. We’re revolutionizing the way people look at and interact with Salons.
<br/>
<br/>
This repo contains back-end source code.<br/>
For front-end repository <a href="https://github.com/pesto-students/vanity---swiggy-for-salon-fe-team1-jesus">click here</a>.

<!-- TABLE OF CONTENTS -->
<br/>

# Folder structure

![](/Images/folderstructure.png)

## Server

This folder contains files that contains nodejs server configuration, logging mechanism. It also consists of Router folder which contains all the routes that vanity app is using.

## Database

This folder contains the files that contain MySql configuration and the model folder which contains all the models that we are using in the vanity app.

## Assembler

This folder contains files that returns the data from the database modal. All the read operations performed by vanity app are declared in assembler folder.

## Command

This folder contains files that writes the data in the database modal. All the writes, updates, delete operations performed by vanity app are declared in command folder.

## Domain

This folder contains the models folder which validates the data entered by customer and repository folder which queries the database, perform the logic and return the data.

## Tests

This folder contains tests cases.

# Table of Contents

1. [Demo](#demo)
2. [Installation](#installation)
3. [Technology Stack](#technology-stack)
4. [Authors](#authors)
5. [License](#license)

<br/>

# Demo

[Live Demo](https://vanity-frontend-pesto.herokuapp.com/dashboard)

<br/>

Please Note:

- We recommend using this app in latest browser with javascript support.
- Try demo credentials </br>
  email: Simon@gmail.com </br>
  password: Simon123 </br>
- Payment Gateway is in test mode, so use <code>4111 1111 1111 1111</code> or UPI Id: <code>Success@razorpay</code> as card no to continue.

<br/>

# Installation

1. Clone the repo
   ```sh
   git clone https://github.com/pesto-students/vanity---swiggy-for-salon-be-team1-jesus.git
   ```
2. Set environment variables

   PORT (Node server port)<br />
   MYSQL_HOST (Mysql host address)<br />
   MYSQL_USER (Mysql userid)<br />
   MYSQL_PASSWORD (Mysql password)<br />
   MYSQL_DATABASE (Mysql database name)<br />
   NEWRELIC_LICENSE_KEY (NewRelic license key)<br />
   EMAIL_ADDRESS (Email address which can be used to send mails)<br />
   EMAIL_SECRET_KEY (16 digit email secret key for authentication )<br />
   EMAIL_HOST (Host server address like mail.smtp.com)<br />
   EMAIL_PORT (Email accessible port)<br />
   RAZOR_PAY_KEY_ID (Razorpay payment app login id)<br />
   RAZOR_PAY_KEY_SECRET (Razorpay payment app login password)<br />
   JWT_SECRET (JWT token secret string)<br />

3. Install NPM packages
   ```sh
   npm install
   ```
4. Run dev
   ```sh
   npm run dev
   ```
5. Open http://localhost:8000 to view it in the browser

6. Run Test cases
   ```sh
   npm test
   ```
7. Run Production ready code (Build) </br>
   It will create a dist folder and and outputs all the files from src folder.
   ```sh
   npm run prod
   ```
   <br/>

# Technology Stack

We tried to use a completely modern tech stack while testing out some new technologies that we had never used before. This resulted in a fast, performant, and easily-extensible web app that should be fairly future-proof for the coming next several years. We used:

- [Node JS](https://reactjs.org/)
- [Express JS](https://expressjs.com)
- [MySQL](https://www.mysql.com/) (RDBMS)
- [Sequalize](https://sequelize.org/)
- [Jest](https://jestjs.io/) (Testing)
- [NewRelic](https://newrelic.com/) (Monitoring)
- [Nodemailer](https://nodemailer.com/about/)

<br/>

# Authors

- [Vivek Hande](https://github.com/VivekHande16)

<br/>

# Mentor

- [Jesus Verma](https://github.com/JesusVerma)

<br/>

# License

[MIT](https://opensource.org/licenses/MIT)
