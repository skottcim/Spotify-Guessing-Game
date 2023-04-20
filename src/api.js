let accessToken;
let store;

const initialDataGrab = () => {
  fetch('/api/game', {credentials: 'include'})
  .then((response) => response.json())
  .then((data) => {
    accessToken = data.accessToken;
    store = data;
    return;});
  fetchSong();
}

const fetchSong = () => {
  console.log('accesstoken is ', accessToken);
  console.log('store is ', store);
}

export default initialDataGrab;