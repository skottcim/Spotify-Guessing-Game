const express = require('express');
const path = require('path');
const { send } = require('vite');
const cookieParser = require('cookie-parser');
const app = express();
const router = express.Router();
const cors = require('cors');
const PORT = 3000;

//Request Handler (Allows us to see which requests are being sent from the frontend, very useful for debugging and development)
//May be useful to comment out in production (backend might get spammed with requests which will be hard to track)
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   return next();
// });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route from button redirect after oAuth
app.get('/start', async (req, res) => {
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Authorization': 'Basic Y2VhMGFjZTk0ODI5NGEwZGJmMzRkOTVmMzMwODFkYmI6MmUwYmI5ZTBjYTFiNDQ4MmFmZjI5ODhlMGViMzc2YmY=',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: new URLSearchParams({
      scope: 'playlist-read-private user-library-read',
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: 'http://localhost:3000/start',
    })
    })
  .then(response => response.json())
  .then(data => {
    if(data) {
      res.cookie('accessToken', data.access_token)
      res.status(200).redirect('http://localhost:8080/game');
    }
  });
});

app.get('/game', async (req, res) => {
  const { accessToken } = req.cookies;
  fetch('https://api.spotify.com/v1/me/playlists?offset=0&limit=50', {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    .then((response) => response.json())
    .then((data) => {
      data.accessToken = accessToken;
      res.status(200).json(data);
    });
})

//catch all route handler
app.use((req, res) => {
  return res.status(404).send('err: page not found (catch all)');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;