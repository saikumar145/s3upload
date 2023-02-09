# create ubuntu EC2 instance then follow below steps
Install NodeJS and NPM using nvm
Install node version manager (nvm) by typing the following at the command line.

### sudo su

### curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
Activate nvm by typing the following at the command line.

### . ~/.nvm/nvm.sh
Use nvm to install the latest version of Node.js by typing the following at the command line.

### nvm install node
Test that node and npm are installed and running correctly by typing the following at the terminal:

### node -v
### npm -v 
Install Git and clone repository from GitHub
To install git, run below commands in the terminal window:

### apt-get update -y
### apt-get install git -y
Just to verify if system has git installed or not, please run below command in terminal:

### **git --version**
This command will print the git version in the terminal.

Run below command to clone the code repository from Github:

### git clone https://github.com/saikumarb006/uploadtos3.git
Get inside the directory and Install Packages

### cd uploadtos3
### npm install
Start the application To start the application, run the below command in the terminal:

### npm start
