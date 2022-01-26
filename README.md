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
$ git clone https://gitea.nikitka.me/Kasefuchs/VeniBot-Dashboard.git
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
   <td><code>yarn install mysql</code></td>
 </tr>
 <tr>
   <td>PostgreSQL or CockroachDB</td>
   <td><a>pg</a></td>
   <td><code>yarn install pg</code></td>
 </tr>
 <tr>
   <td>SQLite</td>
   <td><a>sqlite3</a></td>
   <td><code>yarn install sqlite3</code></td>
 </tr>
 <tr>
   <td>Microsoft SQL Server</td>
   <td><a>mssql</a></td>
   <td><code>yarn install mssql</code></td>
 </tr>
<tr>
   <td>Oracle</td>
   <td><a>oracledb</a></td>
   <td><code>yarn install oracledb</code></td>
 </tr>
 <tr>
   <td>MongoDB</td>
   <td><a>mongodb</a></td>
   <td><code>yarn install mongodb@^3.6.0</code></td>
 </tr>
</table>


well, then I'm too lazy ¯\_(ツ)_/¯