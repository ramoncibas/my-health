<h1 align="center"> 
	My Health
</h1>

<p align="center">
 <a href="#about">About</a> • 
 <a href="#technologies">Technologies</a> • 
 <a href="#how-to-use">Getting Started</a> • 
 <a href="#contributing">Contributing</a> •
 <a href="#license">License</a>
</p>

# <a name="about"></a>📖 About
Application for scheduling medical appointments, you are also able to see your health history and medicines purchased, forget the long lines of people to make an appointment.

# <a name="technologies"></a>🚀 Technologies
This project was developed with the following technologies:

![Angular](https://img.shields.io/badge/Ionic-4586F7?style=for-the-badge&logo=ionic&logoColor=white)
![Ionic](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![FireBase](https://img.shields.io/badge/FireBase-FFCB2D?style=for-the-badge&logo=firebase&logoColor=white)

# <a name="how-to-use"></a>ℹ️ Getting Started
To clone and run this application, you'll need:
* Git
* Ionic 5.4.16
* Angular 11.2.5 
* Node.js v10.16 or higher or Yarn v1.13 or higher installed on your computer.
## Installation
1. Get a free API key at [firebase](https://firebase.google.com/docs/firestore/quickstart)

2. Clone the repository
```
$ git clone https://github.com/ramoncibas/myHealth
```
3. Install NPM packages
```bash
# you can use yarn too
$ npm install
```
4. Enter your API in [environment.ts](https://github.com/ramoncibas/myHealth/blob/master/src/environments/environment.ts)
```js
...dependencies

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});
```
5. Run
```bash
# localhost server
$ ionic serve
```
6. Build
```bash
# Android or iOS
$ ionic cordova build <platform> [options]
```

Build references: [Cordova](https://cordova.apache.org/docs/en/10.x/guide/cli/) and [Ionic](https://ionicframework.com/docs/cli/commands/cordova-build)

# <a name="contributing"></a>🤝 Contributing 
This project is for study purposes too, so send me an email telling me what you are doing and why you are doing it, teach me what you know

All kinds of contributions are very welcome and appreciated!

* ⭐️ Star the project
* 🐛 Find and report issues
* 📥 Submit PRs to help solve issues or add features
* ✋ Give me suggestions for new features
And make sure to read the Contributing Guide before making a pull request.

# <a name="license"></a>📝 License
This project is under the MIT license. See the [MIT](./LICENSE). for more information.

Made with ♥ by Ramon Cibas 👋 [Get in touch](https://www.linkedin.com/in/ramoncibas/)!
