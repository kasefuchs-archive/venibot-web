[//]: <> (Header)
<div>
    <p align="center"><img src="dashboard/public/logo192.png" alt="logo" height="128" width="128"></p>
    <h2 align="center">VeniBot Dashboard</h2>
    <p align="center">
        <div align="center">
            <img src="https://img.shields.io/discord/759796323569500160?logo=discord&color=5865F2&logoColor=ffffff" alt="Discord Server">
        </div>
</div>

[//]: <> (Body)
<h1>About the repository</h1>
<p>This repository contains the VeniBot API and control panel</p>
<h1>Launch</h1>
For the dashboard to work, you need:
<ul>
<li>Any of the databases supported by TypeORM</li>
<li>Discord bot account</li>
<li><a href="https://nodejs.org/en/download">Node.js 16.x</a> (other versions not tested)</li>
<li>Package manager <a href="https://yarnpkg.com/getting-started/install">Yarn</a></li>
</ul>
<h3>Copy the repository and navigate to the folder</h3>
<pre>
$ git clone https://github.com/Kasefuchs/VeniBot-Dashboard.git
$ cd VeniBot-Dashboard
</pre>
<h3>Install dependencies</h3>
In your project root folder enter these commands
<pre>
$ cd server
$ yarn install
$ cd ../dashboard
$ yarn install
$ cd ..
</pre>
<h3>Installing the database driver</h3>

Go to `server` folder
<pre>
$ cd server
</pre>
...and install the driver you need based on the table below
<table>
 <tr>
   <th>Database</th>
   <th>Driver</th>
   <th>Command</th>
 </tr>
 <tr>
   <td>MySQL or MariaDB</td>
   <td><a>mysql</a></td>
   <td><code>yarn add mysql</code></td>
 </tr>
 <tr>
   <td>PostgreSQL or CockroachDB</td>
   <td><a>pg</a></td>
   <td><code>yarn add pg</code></td>
 </tr>
 <tr>
   <td>SQLite</td>
   <td><a>sqlite3</a></td>
   <td><code>yarn add sqlite3</code></td>
 </tr>
 <tr>
   <td>Microsoft SQL Server</td>
   <td><a>mssql</a></td>
   <td><code>yarn add mssql</code></td>
 </tr>
<tr>
   <td>Oracle</td>
   <td><a>oracledb</a></td>
   <td><code>yarn add oracledb</code></td>
 </tr>
 <tr>
   <td>MongoDB</td>
   <td><a>mongodb</a></td>
   <td><code>yarn add mongodb@^3.6.0</code></td>
 </tr>
</table>

<h3>Create dotenv files</h3>

Rename `.env.example` in `dashboard` and `server` directories as `.env` and fill values

<h3>Build<h3/>

run `build` script in `dashboard` and `server` directories

<h3>Finally run</h3>

> use pm2 or run in different terminals

just run `start` script in `dashboard` and `server` directories

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
VeniBot Dashboard is [AGPL-3.0 licensed](./LICENSE).