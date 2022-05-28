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



![chrome_1ope5x9cKs](https://user-images.githubusercontent.com/49683560/170843871-51d470be-731e-4a92-a4dc-4021d68df6af.png)








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
