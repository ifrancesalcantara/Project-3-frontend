# Maquetepinto

Project 3 backend repository



## Description

Maquetepinto is an app that connects users who want to sell their miniature paintings or buy miniature paintor services.

This web application was developed by Iván Francés Alcántara with React, Node.js, MongoDB and Google Maps as the final project for the Ironhack's bootcamp.

With Maquetepinto you can look up showcased miniature paintings and contact its creator by means of a chat.

The next features to add to the tool will be graphs that allow the user to keep track of their exhibitor paintings interactions.

With Maquetepinto you can forget about painting and enjoy the game!


#### Index view (not secured area)

###### CASE 1 unlogged user

- ​		As user I want to be able to access signup or login at anytime using the navbar. 

-  ​	As I user I want to be able to search paintings even if I'm not logged in.
    -   As a user I want to be presented with a reduced list of the trending or most liked paintings first, and be able to filter with more options.
    -   In the painting list I want to see an image, an image of the painter and it's username, and a like button. Also a share option.
    -   When clicking on a painting image, I want to see the details of the painting.
    -   When clicking on the paintor's icon or name, I want to access their profile view.

###### CASE 2 logged in user

- As a logged in user I don't want to see Log In and Signup options. 

- As a logged in user I want to be able to access my profile view.

- As a user I want to be able to search paintings with the same functionality than an unlogged user.



#### Signup view (not secured)

- As a user I want to sign up to the page, leave the following information

  - Username (Validation if username is not in use)

  - Password

  - Home Place

  - Tags (miniature collection interests, painting techniques, etc.)

    --> Validation correct --> route to Secured Index

  - As a user I want to read a message if there was an error.


#### Login view (not secured)

- As a user I want to sign up to the page, leave the following information

  - Username (Validation if username is not in use)

  - Password

  - Home Place

  - Tags (miniature collection interests, painting techniques, etc.)

    --> Validation correct --> route to Secured Index

  - As a user I want to read a message if there was an error


#### Profile view

###### CASE 1 unlogged user

- As an unlogged user, I must not be able to access my own profile view.

- As an unlogged user, I should be able to access other users' profile view.

- As a user, I want to see the user's profile picture, username, tags, their painting exhibitor and a chat start option. 

- As an unlogged user, I should not be able to start a chat with the user, but I should be redirected to log in view.

###### CASE 2 logged in user

- As a logged in user, I want to be presented the same infomation as an unlogged user, and I should be able to start a chat room. 

- When accessing my own profile, I want to see the option to change my profile picture.

- When accessing my own profile, I want to see an option to edit my tags, and option to edit every showcased paintings and an option to delete them from the exhibitor.

- When accessing my own profile, I should be able to see and option to change my password and my home.

- When accessing my own profile, I should not be able to start a chat.
  

  #### CHAT view (secured area)

  - As a user, I want to see the username of the user I'm chatting with.
  
  - As a user, I want to see a list of all the chats that I have open.

  - As a user, I want to be able to access any chat by clicking on them in the list.

  - As a user, I want to send messages to the chatroom and see them displayed with the time.

  - As a user, I want the other user messages to be presented differently to mine.

  - As a user, I want to be able to send images and suggest invoices.

  - As a user, I want to see a reduced version of any sent invoice, with a flag in case I already accepted or rejected it. I should be able to access Invoice view by clicking on it.


  #### Invoice view (secured area)

  - As a user I want to the details of an invoice and the total price. 

  - As a user I want to be able to accept or reject an invoice 

  - If I accepted an invoice, I want to be able to pay it with PayPal.
  
  
  ## API Endpoints:

| **Method** | **Route**                | **Description**                                              | Request - Body                                           |
| ---------- | ------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                      | Main page route. Renders home `index` view.                  |                                                          |
| `GET`      | `/login`                 | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                 | Sends Login form data to the server.                         | { username, password }                                   |
| `GET`      | `/signup`                | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                | Sends Sign Up info to the server and creates user in the DB. | { username, password }                                   |
| `GET`      | `/profile`               | Renders `edit-profile` form view.                            |                                                          |
| `PATCH`    | `/profile`               | Private route. Updates user in DB and renders `/profile`.    | { *parameters to update* }                               |
| `DELETE`   | `/profile`               | Private route. Renders the `signup` view.                    |                                                          |
| `GET`      | `/profile/:userId`       | Renders user profile                                         |                                                          |
| `GET`      | `/invoice/:invoiceId`    | Invoice display.                                             |                                                          |
| `GET`      | `painting/add`           | Displays painting add screen.                                |                                                          |
| `POST`     | `/pinting`               | Posts new painting.                                          | { user_id, title, comment_text, location }               |
| `GET`      | `/pinting/:paintingId`   | Renders painting details view.                               |                                                          |
| `PATCH`    | `/pinting/:paintingId`   | Updates painting info.                                       | { *parameters to update* }                               |


## Services

- Auth Service
    - auth.login(user)
    - auth.signup(user)
    - auth.logout()


## Components

- Login component
    - Input: user: null
    - Output: user object

- Signup component
    - Input: user: null
    - Output: user object

- Navbar component
    - Input: isLoggedIn: Boolean, user: null
    - Output: user object

- AddPainting component
    - Input: handleChange, handleSumbit
    - Output: painting object

- PaintingDetails component
    - Input: paintingId
    - Output: painting edited parameters

- PaintingList component
    - Input: paintings: null, filterOptions: arrayobject, view: String
    - Output: painting array object

- Profile component
    - Input: isLoggedIn, user: null
    - Output: profile composition

- User image component
    - Input: view: String, userId: String
    - Output: empty

- Painting tags component
    - Input: paintingId: String
    - Output: empty

- AnonRoute component
    - Input: isLoggedIn, path, component
    - Output: page composition

- PublicRoute component
    - Input: isLoggedIn, path, component
    - Output: page composition


## Models

User model

```
{
    dateOfCreation: Date,
    username: {type: String, required: true},
    paintings: [{type: mongoose.Types.ObjectId, ref: "Painting"}],
    delivers: Boolean,
    mounts: Boolean,
    profilePic: String,
    techniques: [String]
},{
    timestamps: { createdAt: "created_at"}
  }
```

Painting model

```
{
    image: String,
    title: {type: String, required: true},
    description: String,
    creator: mongoose.Types.ObjectId,
    game: {type: String, enum: ["Legends of the Old West", "Warhammer Fantasy", "Warhammer 40k"]},
    tags: [String],
},{
    timestamps: { createdAt: "created_at"}
}
```

Likes model

```
{
  userId: {type: mongoose.Types.ObjectId, ref: "User"},
  paintingId: {type: mongoose.Types.ObjectId, ref: "User"},
  date: Date
}
```



## Backlog

- Responsive design.

- Zoom in in painting view image.

- Google Maps route in user view.

- Stripe API to simulate payment.

- Socket.io API in chat view.

[See the Trello Board](https://trello.com/invite/b/WQswkY95/63016e5bab7265845f49d91710c94d02/maquetepinto)



## Links

### Git

Repository Link is empty until we get the 
[Repository Link]()

[Deploy Link]()



### Slides

[Slides Link](https://docs.google.com/presentation/d/1tlMt5zrmhlOMjv-qP8eWQyACbVviABN1YhZMkMXT8nM/edit?usp=sharing)



