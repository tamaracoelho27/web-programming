SETUP
If you want to setup the server for yourself, you need to make sure to do these things in order for it to work in your system
Before you start, make sure you have vs code, xampp, apache and a browser of your choice on hand

Part 1 : Make sure your xampp server and sql databases are apporpriately written into 
    Step 1 : Firstly, open xampp and make sure your apache and mysql modules are on as shown in the picture
    ![image](https://github.com/user-attachments/assets/b45e7ea0-1f73-427d-ba57-fcb4a2488cee)
    Step 2 : Click admin of the mysql module and go to the phpmyadmin page which should open in your browser for you and look like the pictures below
    <img width="502" alt="image" src="https://github.com/user-attachments/assets/b5659ef8-9bb5-488d-8ec1-aa17cba76e2a">
    ![image](https://github.com/user-attachments/assets/7dcba258-f705-4dda-879d-523ceeed217d)
    Note : Part 1 Step 3 is an one time step and you do not need to usually run it every single time, this step is just for first time installation. Steps 1 and 2 must be done to run the website, Step 3 is just to make sure you have the tables in your database
    Step 3 : Go to the sql part and insert the following code : 
    CREATE DATABASE admin_system;
    USE admin_system;
    CREATE TABLE admins (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        pin VARCHAR(6) NOT NULL,
        PRIMARY KEY (id)
    );
    INSERT INTO admins (username, password, pin)
    VALUES ('admin1','password123', '123456');
    USE admin_system;
    CREATE TABLE patients (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        pin VARCHAR(6) NOT NULL,
        PRIMARY KEY (id)
    );
    INSERT INTO patients (username, password, pin)
    VALUES ('patient','password', '123456');


Part 2 : Initalize the server in vs code
Before you start, you need the server and a database open so you can actually refer so first downlaod the apps
    Step 1 : Download the full code zip files in the github and extract them 
    Note : Part 2 Step 1 is once again a one time step, you only need to do this once, you dont need to redownload the code everytime you want to test out the code 
    Step 2 : Open this folder within your vs code by going to the file section in the top left of the vs code interface 
    <img width="615" alt="image" src="https://github.com/user-attachments/assets/d8d06961-9c67-4fc5-a6f3-a722e9336bb1">
    Step 3 : Then click open folder
    <img width="360" alt="image" src="https://github.com/user-attachments/assets/001e39e0-5f33-43fc-856c-994acc673d19">
    Step 4 : Open the extracted folder which you have done earlier
    Step 4.5 : Ensure all the files in your vs code are all in the same folder with no subdivisions like the picture below 
    ![image](https://github.com/user-attachments/assets/4fc7d7ef-9f28-446b-8ca5-d4bbfe9d4b54)
    Step 5 : Open a terminal in git bash by going to terminal
    <img width="596" alt="image" src="https://github.com/user-attachments/assets/68bbf59d-724b-4859-9ad7-398ee9e923e6">
    Step 6 : Click new terminal 
    <img width="682" alt="image" src="https://github.com/user-attachments/assets/102863fb-a868-4e17-8bf3-46c470337b07">
    Step 7 : Make sure the terminal is git bash as the following commands only work in bash, you can create this by clicking here
    <img width="1111" alt="image" src="https://github.com/user-attachments/assets/5a49e177-3714-4f51-b85c-dfd59f94dd94">
    <img width="1136" alt="image" src="https://github.com/user-attachments/assets/d702b810-3e19-47a2-a8a1-75a45844a1ce">
    Step 8 : Once this is done, run the following commands in this git bash terminal (This is assuming you have done the previous steps correctly, do these commands one by one line by line)
    npm init -y
    npm install express body-parser bcrypt mysql dotenv cors mysql2
    node server.js
    The below images are what you should see as you type out each command one by one
    ![image](https://github.com/user-attachments/assets/da5c28df-544b-48ce-ac04-bb83e8f6e583)
    ![image](https://github.com/user-attachments/assets/bf8f2daa-7308-47fb-a6d4-0b41c44d1ff0)
    ![image](https://github.com/user-attachments/assets/86aa9fdd-bcf6-437a-a8eb-e8e96ad2f6c5)
    Note : the final command will only work if server.js is not under any sub-folder as was shown in Part 2 Step 4.5

Part 3 : Opening the website 
    Step 1 : Open the extracted folder within your file explorer, it should look like this 
    ![image](https://github.com/user-attachments/assets/31705c72-dc5a-47f0-a7cf-02ba5578de62)
    Step 2 : Open either admin log in (shown in red circle) or patient log in (shown in green circle) in your desired browser of choice(im using edge here but anything works)
    <img width="1262" alt="image" src="https://github.com/user-attachments/assets/d73604b4-e9fe-4cc1-8483-56a574581292">
    If it works as intended, it should show either the admin log in page as shown in the picture below
    ![image](https://github.com/user-attachments/assets/fb7a0dd1-fdf9-41b7-8ffb-2da7da2bab2b)
    or the patient log in page shown below
    ![image](https://github.com/user-attachments/assets/e44055ae-5945-453c-82a6-ad817d2875d6)




    
    


    



