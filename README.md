# Hirott Blog Nodejs Website

## Getting Started
This document tells you how to get started setting up a Hirott website. 

Type the following command to start website.

'''
node server
'''

---

## Install
Below are the options to install Hirott. If you're not sure what to choost, please use the auto-install script installation method.

### Overview

1. Nodejs
2. Packages / Dependencies
3. Database

### 1. Nodejs

#### Windows

You can download nodejs installation package from the offical webside: [nodejs.org](http://www.nodejs.org)
Click "Install" button to download nodejs installation package. Then you run it.

#### Linux Ubuntu

You also can download nodejs installation package from the offical webside: [nodejs.org](http://www.nodejs.org)

Or, you can type the following command in terminal

```
sudo apt-get install node
```

### 2. Packages / Dependencies

**Note:** During this installation some files will need to be edited manually. If you are familiar with vim set it as default editor with the commands below. If you are not familiar with vim please skip this and keep using the default editor.

```
npm install
```

### 3. Database

#### Linux Ubuntu

Install the database packages

```
Create database "hirott" in MySQL
Then, run the sql script in '/install/hirott.sql'