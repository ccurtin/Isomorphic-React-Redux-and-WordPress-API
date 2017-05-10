# Isomorphic React Redux and WordPress API


## What's Inside
- Isomorphic App / Server-Side Rendering
- ReactJS
- Redux
- Babel
- Webpack 2
- Mocha
- Enzyme
- ESLint
- Koa Web Framework for NodeJS
- PostCSS

- WordPress - for API
    - Wordmove to synchronize WP databases
- Vagrant to run local server with WordPresss

- Using deployHQ.com to send repo pushes to AWS(react) and inMotion(WP API)


## First Steps:
- Clone this project and create a new repo online to work with.
    - `git clone https://github.com/ccurtin/Isomorphic-React-Redux-and-WordPress-API.git`
- If you aren't familiar with [Vagrant](https://www.vagrantup.com/), you should first read more about getting started [here](https://www.vagrantup.com/intro/getting-started/index.html). We will only be using it for serving the WordPress REST API. So you may skip this if you aren't working with the WP REST API or working with it differently.
- Create the two _remote_ servers.
    - NodeJS. Suggested setup : [how to setup a NodeJS environment on Amazon AWS](https://github.com/ccurtin/universal-react-redux-boilerplate-plus/wiki/Creating-a-Node.js-Server-on-AWS-and-Running-a-Universal-React-Redux-App.)
    - Wordpress REST API setup.
    - BE SURE TO SAVE ALL LOGIN INFO IN A EASLIY AND SAFELY ACCESSIBLE SPREADSHEET, becuase there is A LOT of logins you need to remember and it sucks spending 30 minutes looking around different files finding the login info you need. An example of logins/infos to record is below as a template for you:

```yaml
BITNAMI:
    username: ''
    password: ''
    vault_password: ''

WORDPRESS:
    WP cPanel / FTP:
        hostname: ''
        username: ''
        password: ''

    WP Admin Login:
    wp_admin_url: ''
    username:     ''
    password:     ''

    WP Remote Database:
        database: ''
        user:     ''
        password: ''

AWS:
    username/email: ''
    password:       ''
    EC2 Management: https://us-east-2.console.aws.amazon.com/ec2/v2/home

SSH-ing INTO SERVER:
Download the private keys from the Bitnami Dashboard for your Virtual Machine first then keep the full SSH command handy so you can quickly login from any terminal.
    Example:
    ssh -i A:\username\project_name\AWS\keys\bitnami-aws-837492734623.pem bitnami@12.34.56.123
    
REACT SERVER ADDRESS(found in bitnami dashboard):
http://12.34.56.123

```


## Setting Up the WordPress API
- Navigate to the folder: `WordPress VM` and and copy or rename the config file `site.yml.example` to just `site.yml`:
    - update the Hostname and IP Address, Title, Description, etc.
    - _git will not track `site.yml` file for security reasons._
- start your server:  `vagrant up`
- SSH into your Vagrant VM: `vagrant ssh`
- install [Wordmove](https://github.com/welaika/wordmove) : `gem install wordmove`
- Usually, you'd create a `Movefile` by going to the `wordpress` directory and running `wordmove init`. But I have updated the the paths in an example Wordmove config file so that only credentials need to be entered.
    - So go to the `wordpress` folder and copy or rename the file `Wordmove.example` to just `Wordmove` and update the credentials; the paths can be left alone._(git will not track `Wordmove` file for security reasons.)_
- When you are ready to sync the database to the remote server, first make sure you're SSH'd into Vagrant and then run `wordmove push -d`.
- You can also push just theme files: `wordmove push --themes`, plugins: `wordmove push --plugins` or the entire wordpress folder: `wordmove push --wordpress`.
- For all commands: `wordmove help`
    - although you _can_ use wordmove to push files to the server, it's highly suggested to use version control and DeplyHQ to track featured and deployments.


## Setting Up the React App/Site
- view the README in the `react` folder for more in-depth info.
- If not done already, setup a NodeJS server. Directions are above under **First Steps**
- the react app will simply be run on `localhost`
- navigate to the react folder and run `npm run dev` to start development.
- commit changes when ready.
- push to your repo.
    - DeployHQ will send files to AWS server.
- to update the remote server you must **BUILD** the production set on the server via `npm run build` and then restart `pm2`. If `pm2` is not installed see [Continuously Run Project on Server](https://github.com/ccurtin/universal-react-redux-boilerplate-plus/wiki/Creating-a-Node.js-Server-on-AWS-and-Running-a-Universal-React-Redux-App.#4-continuously-run-project-on-server) on the wiki [how to setup a NodeJS environment on Amazon AWS](https://github.com/ccurtin/universal-react-redux-boilerplate-plus/wiki/Creating-a-Node.js-Server-on-AWS-and-Running-a-Universal-React-Redux-App.)
    - Login to AWS via the SSH command provided by bitnami. _(See "SSH-ing INTO SERVER" under **First Steps** above)_ 
    - Then, simply run the command `pm2 restart server`. _server_ refers the the server file at `./bin/server`


## Using DeployHQ to Deploy Projects
- Firstly, [DeployHQ](https://deployhq.com/) is only FREE for _ONE_ project.
    - Options: you could create two separate FREE accounts, or pay $10/mo for upto 10 projects, **OR** not use DeployHQ at all, but it has some pretty nice features that can make complicated projects easier to manage and deploy. 
- First, need to add the GitHub Repo as a new Project.
    - subdirectory to deplofy from: `react`
    - copy the public key provided and place in the GitHub Repo's `Settings > Deploy Keys > Add Deploy Key`
- Second, in your Deploy Project click `Settings > Servers & Groups > + (to add new server)` to deploy TO.
    - if using an AWS server(via Bitnami) let's setup a new `SSH/SFTP` server.
    - enter in the username: `bitnami` and the hostname IP Address.
    - check `use SSH key rather than password for authentication`
    - enter the path to deploy to on the server. Example: `/home/bitnami/website` (`website` is a directory created manually via SSH of SFTP)
    - enter an environment -- it's so that it can be used to create SSH commands.
    - enter the subdirectory to deploy FROM, ie: `react` in this example
    - Save it! Do the same for the WP API directory.
    - For the WP API: the `Deplyment Path` should be set to `public_html/` and the `Subdirectory to deploy from` should be set to `WordPress VM/www/wordpress/`. Don't forget to add the GitHub webhook for this server too!
- Third, optionally setup a webhook to **automatically deploy** to the server.
    - click the Server you just setup. On the right-hand side their is "Automatic Deployment" URL. Copy it and go to your project on github and go to `Settings > Webhooks > Add Webhook` and just paste that "Automatic Deployment" URL in. Make sure content-type is set to `application/x-www-form-urlencoded`