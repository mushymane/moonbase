# moonbase
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Table of Contents

- [moonbase](#moonbase)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Usage](#usage)
  - [Built With](#built-with)
  - [Technologies Used](#technologies-used)
  - [Practices Used](#practices-used)
  - [Deployed Link](#deployed-link)
  - [Authors](#authors)
  - [Important Code Snippets](#important-code-snippets)
  - [Wireframes](#wireframes)
  - [License](#license)
  - [Questions](#questions)
  

## Description

add moonbase desc


[Click this link to go to the live site]()
 <br />

**See this unique experience in action!**

![See this unique experience in action]()



## Features
**FEATURE**
SOME COOL FEATURES
![Demo of image viewing]()


**Browse posts and "hype" them up!**
* "Hypes" are user-engagement points that are awarded to users for doing social activities like creating posts or comments. Users can then expend their hypes to "hype up" posts that they think are important. Post can be hyped up any number of times. The more that a user is active, the more influence that user can have on the site.
![Demo of browsing and hyping](./public/images/hype-demo.gif)

**Create new posts and display automatically generated stock values**
* Users can create posts and indicate if they think the stock is bullish or bearish. When a user submits their post, Moonbase will automatically pull the current stock price, dollar change, and percent change and add it to the post.
![Demo of creating posts](./public/images/new-post-demo.gif)

**View which stocks are trending in the market**
* Users can see which stock are trending from *within* the Moonbase website. No need to leave the website to view this information!
![Demo of viewing trending stocks](./public/images/trending-demo.gif)

**View the market data for a post's stock**
* Users can view the current market data for post's stock from *within* the Moonbase website too!
![Demo of viewing single stock data](./public/images/stock-demo.gif)

**Add bullish/bearish flair to a post or comment**
* Users can add bullish or bearish flairs to posts and comments to share their opinion on the stock sentiment.
![Demo of bullish/bearish flairs](./public/images/comment-demo.gif)



## Prerequisites
1. [Install Node.js](https://nodejs.org/en/download/)
2. [Install MySQL](https://www.mysql.com)

3. Create database
   
        mysql -u root -p
        source ./db/schema.sql

4. Install JavaScript packages given in package.json

        npm install


5. Seed database:

        npm run seed

## Usage

        npm start

[Test deployed on Heroku as well]()

## Built With

* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  * [bcrypt](https://www.npmjs.com/package/bcrypt)
  * [dotenv](https://www.npmjs.com/package/dotenv)
  * [Express Handlebars](https://www.npmjs.com/package/express-handlebars)
  * [MySQL2](https://www.npmjs.com/package/mysql2)
  * [Node.js](https://nodejs.org/en/)
  * [nodemon](https://nodemon.io/)
  * [Sequelize](https://sequelize.org/)
* [MySQL](https://www.mysql.com)
ADD cheerio, axios, finnhub, bootstrap


## Technologies Used

* [Microsoft Visual Studio Code](https://code.visualstudio.com/)
* [Git Bash](https://git-scm.com/downloads)
* [GitHub](https://github.com/)
* [NVDA Screen Reader](https://www.nvaccess.org/)
* [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
* [Lighthouse](https://developers.google.com/web/tools/lighthouse/)
* [Google Chrome Developer Tools](https://developer.chrome.com/docs/devtools/)

## Practices Used

* Agile style User Story and Acceptance Criteria.
* [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

## Deployed Link

* [See the Live Site!]()

## Authors

**Alexander Gibson** 

- [Link to Alex's Github](https://github.com/argibson02)
- [Link to Alex's LinkedIn](www.linkedin.com/in/alexander-gibson-1b0bb6105)

**Gabriel Lantin**

- [Link to Gabriel's Github](https://github.com/mushymane)
- [Link to Gabriel's LinkedIn](https://www.linkedin.com/in/luigilantin/)

**Henry Kam**

- [Link to Henry's Github](https://github.com/gulpinhenry)
- [Link to Henry's LinkedIn](https://www.linkedin.com/in/kamhenry/)


## Important Code Snippets
* random stuff ig:

![code for a "collect parameters" function](./assets/images/getSearchParameters.PNG)



## Wireframes
![wireframe of the display page](wireframes)

## License

This application is covered under the MIT license

## Questions

For any questions, please reach out by creating an issue.