# SoPra FS22 - Group 30 - Cookever (Client)

## Introduction
Our project is a website which enables users to share the recipes they created and organize parties. To utilize our website, users need to register first. A registered user can browse all the recipes on the home page, and create their own recipes. And the other major function of our website is party organisation. Users can create parties and invite other users to join their parties, moreover, the host of the party can import one recipe into the party, and every participant of the party can use our real-time ingredients checklist on the party page to manage who is going to bring what ingredients.

## Technologies
* React
* MUI
* Cloudinary
* Java Spring Boot
* WebSocket
* REST
* Heroku: Cloud Application Platform

## High-level components
[User Information Management](https://github.com/sopra-fs22-group-30/sopra-fs22-group-30-client/blob/master/src/components/views/Profile_edit.js) <br/>
This component allows users to edit the information of their own profile(e.g. profile picture, username, gender, birthday and self-intro).<br/>
[Recipe Creation and Edit](https://github.com/sopra-fs22-group-30/sopra-fs22-group-30-client/blob/master/src/components/views/Recipe_creation_or_edit.js) <br/>
This component allows users to create and edit their own recipes. There are certain information users need to provide for the recipes including recipe name, cuisine, time consumed, ingredients and so on.<br/>
[Party](https://github.com/sopra-fs22-group-30/sopra-fs22-group-30-client/blob/master/src/components/views/Party.js) <br/>
This component displays the detailed party page which shows the basic information about the party. In addition, there is an ingredients checklist on this page, which provides all participants of the party to manage the preparation of the ingredients in real-time.<br/>
## Launch & Deployment
For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org/en/). All other dependencies including React get installed with:

`npm install`

This has to be done before starting the application for the first time (only once).

`npm run dev`

Runs the app in the development mode.

Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console (use Google Chrome!).

`npm run test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://create-react-app.dev/docs/running-tests/) for more information.

`npm run build`

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The application is deployed on [heroku](https://sopra-fs22-group-30-client.herokuapp.com/login).

## Illustrations

![1 login](https://user-images.githubusercontent.com/49683560/170845161-0fc26952-dc93-4d34-b19a-365425459347.png)

When you first arrive at the website, you are first asked to either signup or sign in. Notice that signing up will automatically login in and enter the home page. 

On the home page, you will find a navigation panel above, where you can create a new recipe, head to your own profile, come back to the home page or log out. On the left side of the main part of the home page, you can see the recipe created by all users. You can see the parties you hold and those you are invited to join on the right side.

![2 home page](https://user-images.githubusercontent.com/49683560/170845039-d262bf88-6ae0-4214-a101-dcbdde0fc63a.png)

By clicking the "New Recipe" button, you will enter a recipe creation page where you fill in the information such as the time cost, how many peoples, and ingredients. You can upload a picture for your recipe as well.

![3 recipe creation](https://user-images.githubusercontent.com/49683560/170845044-95e8849f-d6d2-4410-8bf5-c5ba2fcbfe5a.png)

After clicking the submit button, your recipe will be created and you will head to the recipe page. This recipe will then be seen by other users. On every recipe page, there is a "heart" button that you can hit to like the recipe. 

![4 recipe detail](https://user-images.githubusercontent.com/49683560/170845047-5a9a8ce8-9a89-4250-9a88-9e10e69ba4e9.png)

By clicking the "New Party" button, you can head to the party creation page where you filled in the basic info such as the time and the used recipe and invited other users. The users that you selected will receive the invitation notification and be added to the party. You can also be invited by other users. You will see a green notification pop up and the party will show on your home page.

![5 party creation](https://user-images.githubusercontent.com/49683560/170845058-863e2422-8430-4528-96f3-b71f0b87df24.png)

Clicking the party name on the notification or the party bar on the home page will bring you to the party detail page where you will see the time, place, and other info of the party. More importantly, there is an ingredient panel. The ingredients on that panel are imported by the party holder by selecting the used recipe. You can select the ingredient you want to bring and your name will be marked. This can also be seen by other users so everyone will know who is bringing what to the party so that there won't be any ingredient missed or duplicated brought.

![6 party detail](https://user-images.githubusercontent.com/49683560/170845086-58809554-7e1c-4a0a-98ef-56e25ae7839d.png)

On the recipe detail page and the party detail page, you can visit the profile page of the recipe author or the other users. You can also visit your own profile page through the navigation bar. On the profile page, you can fill in your personal info such as your birthday, and upload an image as your profile avatar. You can also check out your recipe and the recipe you liked.


![7 profile](https://user-images.githubusercontent.com/49683560/170845089-0c42021a-6a02-4159-9084-561765f8087b.png)

This is a basic illustration of the user flow of our app. 
Hope you will find it interesting and useful! Thank you!






## Roadmap
- Add comments on recipes:<br/>
Users can comment on a recipe, posting their thoughts on the recipe.

- Add filters of recipes:<br/>
Users can filter the recipes on the home page. For example, filter recipes that take less than 30 minutes to make.

- Add a chatbox on the party page:<br/>
All users within the same party can chat in real-time.

- Add an invitation management field:<br/>
Users are able to view multiple invitations and can decline or accept them.

## Authors and acknowledgment
- [Duan Huiran](https://github.com/duanhuiran)
- [Guan Hongjie](https://github.com/HJGuan)
- [Jing Duanran](https://github.com/duanranjing)
- [Luo Tiantian](https://github.com/tluo3032)
- [Li Wenzhe](https://github.com/wenzli0510)

## License
MIT License

Copyright (c) 2022 UZH-SoPra-FS22-Group-30

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
