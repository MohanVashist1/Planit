# About the application
This application has the ability to generate an Iterary for you based on your prefrences. In addition, it can plan out which times you should visit the locations, sync with your phone's calendar and give you interesting attractions based on a set location, feedback/review system as well as navigation to locations.

### Screenshots
(Key features only) https://imgur.com/a/s0llDHL

## Setting up the backend
#### Note that the commands are for Linux, I cannot guarantee that these commands work in MacOS/Windows

1) cd into the backend folder
  ```
  cd backend
  ```
2) In order to enusre that everone has the same dependencies installed, use the already generated Python virtual enviroment
  ```
  source pyenv/bin/activate
  ```
  ##### Note that if you need to add any new dependencies please use the python virtual enviroment.
  
3) Install requirements
  ```
  pip install -r requirements.txt
  ```
  
    1) If you need to update requirements.txt (if you added a new dependencie)
      ```
      pip freeze requirements.txt
      ```  
      Please do this in the location where the requirements.txt is. This means that when you run the existing command it should replace the old requirements.txt

4) (Optional), In order for the frontend and backend to communicate you must setup NGROK.
    1) Download NGROK and create an account https://ngrok.com/
    2) Connect to NGROK 
       ```
       ./ngrok authtoken <MY_TOKEN> 
      ```
      You can find your token on your NGROK dashboard
    3) Start NGROK on port 5000
       ```
       ./ngrok http 5000
       ```
    4) In the NGROK terminal there should be a http link, use this and replace the base url in the following location
      ```
      cd  project-cipher/plannit/src/api/planitApi.js 
      ```
    #### NOTE THAT THE NGROK URL EXPIRES EVERY 8 HOURS
     
5) While your python virtual envirment is running, 
    ```
    flask run
    ```
    This will start the flask app
    
6) (Optional) Once you are done and no longer want to work you can exit the python virtual enviroment,
  ```
  deactivate
  ```
  
  
  
## Setting up frontend

#### This will vary from system to system drastically however, there should be some common steps

1) Cd into the planit folder
  ```
  cd planit
  ```
2) Install the dependencies
  ```
  npm install
  ```

3) Run the application
  ```
  sudo npm start
  ```

#### Please note that if you want to communicate to the backend, please follow the backed setup instructions above, MAKE SURE TO SETUP NGROK!
