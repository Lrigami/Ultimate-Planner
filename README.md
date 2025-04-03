<a id="readme-top"></a>
[![Issues][issues-shield]][issues-url]
[![AGPL License][license-shield]][license-url]
[![Commercial License](https://img.shields.io/badge/💼%20Commercial-License-blue?style=for-the-badge)](BUSINESS-LICENSE.md)
[![LinkedIn][linkedin-shield]][linkedin-url]

<h1 align="center">Title of Project</h1>

<p align="center">
  <a href="http://forthebage.com"><img src="http://forthebadge.com/images/badges/built-with-love.svg" alt="Made with love icon"/></a>
  <a href="http://forthebage.com"><img src="https://forthebadge.com/images/badges/mondays-coffee-1.svg" alt="Mondays coffee icon"/></a>
</p>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#roadmap">Roadmap</a></li>
      </ul>
    </li>
    <li><a href="#get-started">Get Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#launching">Launching</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#versions">Versions</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#authors">Authors</a></li>
  </ol>
</details>

## About the Project

Ultimate Planner is a comprehensive application designed to help you organize and plan your day-to-day tasks. With features that span from to-do list management to tracking habits, this app is built to improve productivity and daily planning. The app includes:

- To-do lists and task management, with both list and kanban views.
- Calendar management for personalized event creation, offering daily, weekly, and monthly views.
- Note creation to help you stay on top of important reminders.
- Tracker management for keeping tabs on water intake, mood, sleep, and habits.
- Dashboard view that brings together the key elements of your day, with stats from trackers and habits.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Roadmap

The project is currently in the development phase. The project has been initiated. 

Here is the project roadmap for the moment: 
- [x] MVP (v. 1.0.0):
    - [x] To-do list and task management (#13); 
    - [x] Management of several to-do lists (#17);
    - [x] Kanban view (#18);
    - [x] User management (#24);
- [ ] V1 (v. 1.1.0): 
    - [x] Menu (#30);
    - [ ] Custom management (color, pin, tags) (#29);
    - [ ] Settings (#31);
    - [ ] Management of notes (#32);
- [ ] Later:
    - [ ] Dashboard;
    - [ ] Tracker management (water, mood, sleep); 
    - [ ] Habit management;
    - [ ] Event management and display;
    - [ ] Advanced settings.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Get Started

Follow the instructions below to get started with the Ultimate Planner project. You'll need to set up the environment and install some dependencies before running the app.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Prerequisites

Before proceeding with the installation, please ensure that the following software is installed on your system:
- Node.js (Version 14.x or higher). You can download [Node.js from here](https://nodejs.org/fr).
- npm (Node Package Manager) or Yarn
- PostgreSQL (for the database)

For Windows: 
- Git Bash (to run the database creation script). You can download [Git bash from here](https://git-scm.com/downloads).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation

**Clone this repository:**

`git clone https://github.com/Lrigami/Ultimate-Planner.git`

**Navigate to the project directory:**

`cd Ultimate-Planner/backend`

**Install the dependencies:**

`npm install`

Set up the database by configuring the PostgreSQL connection in .env file.

**Create the database :**
**On Linux/macOs:**

```sh
chmod +x setup_db.sh
./setupdb.sh
``` 

**On Windows:**

Make sure that Git Bash is configured to use PostgreSQL, i.e. `psql` must be installed and available in the PATH of the Git Bash environment.
Open Git Bash in the project directory.

`./setupdb.sh`

Follow the instructions in the terminal to create and import the database.

**Start the development server:**

`npm run start`

Now, the application should be running locally at http://localhost:3000.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Launching

To launch the project, navigate to the frontend directory : 

`cd Ultimate-Planner/frontend`

Install the dependencies : 

`npm install`

Then run the following command:

`ng serve`

This will start the project. You can access it via your browser at http://localhost:4200.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built with

* [Angular](https://angular.dev/) - Web Application Framework
* [Node.js](https://nodejs.org/fr) - Runtime Environment
* [PostgreSQL](https://www.postgresql.org/) - Relational Database Management System (RDBMS)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

If you'd like to contribute to the development of Ultimate Planner, please read our CONTRIBUTING.md for guidelines on how to submit a contribution.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Versions

<p>Latest stable version: 1.0.0</p>
<p>Latest release: 1.0.0</p>
<p>[You can see the full list of releases here.](https://github.com/Lrigami/Ultimate-Planner/tags)</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

This project is under ``GNU AFFERO GENERAL PUBLIC`` license - see [LICENSE](LICENSE) file for more informations.
**If you need a commercial license, please contact me.** 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

[Angular UI](https://material.angular.io/) - For providing a great utility-first CSS framework that helped with the UI.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Authors

* **THIRY Prune** _alias_ [@Lrigami](https://github.com/Lrigami)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/Lrigami/Ultimate-Planner.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Lrigami/Ultimate-Planner.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/Lrigami/Ultimate-Planner.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/Lrigami/Ultimate-Planner.svg?style=for-the-badge
[issues-url]: https://github.com/Lrigami/Ultimate-Planner/issues
[license-shield]: https://img.shields.io/github/license/Lrigami/Ultimate-Planner.svg?style=for-the-badge&color=green
[license-url]: https://github.com/Lrigami/Ultimate-Planner/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/prune-thiry-6886a6136
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
