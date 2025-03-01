# Web Chat Application

## Description
This Web Chat application allows users to exchange real-time messages within a chatroom. It utilizes PHP and MySQL for the backend, with AJAX and JavaScript enhancing the frontend interaction. 

## Features
- Real-time messaging between multiple users.
- Session control with auto-logout on inactivity.
- Secure login and registration with session management.

<img src='UI.jpg' alt='UI screenshot' width='200' height='300' style='display:inline-block' />

## Installation

### Prerequisites
- Docker installed on your machine.
- LAMP docker container setup.

### Setup
1. Clone this repository.
```shell
git clone https://github.com/gxlvera/ChatRoomService
```
2. Navigate into the project directory.
3. Start your LAMP container. Ensure it's configured to mount the `public_html` directory from this repository.

### Configuration
- Ensure the MySQL database is up and running as expected.
- Import the SQL schema available in the `sql/` directory to set up the necessary tables for accounts and messages.

## Usage
1. Open your web browser and navigate to the hosted address of your Docker container.
2. Register a new account or login using an existing account.
3. Once logged in, you can start chatting with other users who are online.

## Files Included
- `login.php`: Handles user registration and login.
- `check.php`: AJAX backend for checking user existence.
- `chat.php`: Main chat interface.
- `chatmsg.php`: Backend for sending and receiving messages.
- `login.js`, `chat.js`: Frontend JavaScript for handling UI interactions.
- `login.css`, `chat.css`: CSS files for styling the application.

## Contributions
Contributions are welcome. Please fork this repository and submit a pull request if you have features you'd like to add.

