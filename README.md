# Project Name
Lisbon Street Art

<br>

## Description

Interactive platform for users to deploy cool Stret Art photos from Lisbon Places.
See photos other users submitted, review them, see top rated and latest photos, and create routes to visit those places.

<br>

## User Stories

- **homepage** - As a user I want to see a page that shows a title/banner image, a description of the website, sign up/sign in call, and top rated and latest user submitted photos. I also want a navbar for easy navigation.
- **sign up** - A signup button to create an account.
- **login** - A login button to authenticate and access my user profile.
- **logout** - A logout button that only appears if I'm logged in.
- **edit user** - As a user I want to be able to edit my profile.
- **favorite list** - As a user I want to see the list of my favorite photos/locations and delete them.
- **community** - As a user I want to see a list of contributors to the website.
- **photos** - Viewing all pictures users submitted.
- **photos-filter** - As a user I want to see the list of photos/locations filtered by my preferences.
- **photo-details** - As a user I want to see more details of the photo, to be able to see the location, reviews/rating, to be able to add it to favorites, and add a review.
- **404** - Custom 404 page to show I went somewhere that doesn't exist
- **500** - Custom 500 page to show the error isn't my fault

<br>

## Server Routes (Back-end):

| **Method** | **Route**                     | **Description**                                                          | Request - Body                                                          |
| ---------- | ----------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `GET`      | `/`                           | Main page route. Renders home `index` view.                              |                                                                         |
| `GET`      | `/login`                      | Renders `login` form view.                                               |                                                                         |
| `POST`     | `/login`                      | Sends Login form data to the server.                                     | { email, password }                                                     |
| `GET`      | `/signup`                     | Renders `signup` form view.                                              |                                                                         |
| `POST`     | `/signup`                     | Sends Sign Up info to the server and creates user in the DB.             | { email, password }                                                     |
| `GET`      | `/private/edit-profile`       | Private route. Renders `edit-profile` form view.                         |                                                                         |
| `PUT`      | `/private/edit-profile`       | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [nickname], [imageUrl], [aboutMe], [instagramLink] } |
| `GET`      | `/private/favorites`          | Private route. Render the `favorites` view.                              |                                                                         |
| `POST`     | `/private/favorites/`         | Private route. Adds a new favorite for the current user.                 | { title, artist, location, GPSLocation }                                |
| `DELETE`   | `/private/favorites/:photoId` | Private route. Deletes the existing favorite from the current user.      |                                                                         |
| `GET`      | `/photos`                     | Renders `photos-list` view.                                              |                                                                         |
| `GET`      | `/photos/details/:id`         | Renders `photos-details` view for the particular photo.                  |

| `GET` | `/private/community` | Private route. Renders `users-list` view.

| `GET` | `private/route` | Private route. Renders `route-creation-list` view. Uses Google Maps API in connection with favorite photos.

## Models

User model

```javascript
{
  nickname: String,
  email: String,
  password: String,
  description: String,
  instagramLink: String,
  favorites: [FavoriteId],
}

<br>

## API's


<br>

## Packages

<br>

## Backlog

[https://trello.com/b/vGkPiSkG/lisbon-street-art]()

<br>

## Links

### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()

<br>

### Slides

The url to your presentation slides

[Slides Link]()

### Contributors

Gustavo Couto - [`<github-username>`](https://github.com/Guss-Gustavo-Couto) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/gustavo-couto-225b2324b/)

Margarida Pereira - [`<github-username>`](https://github.com/mapmargaridapereira) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/mapmargaridapereira/)
