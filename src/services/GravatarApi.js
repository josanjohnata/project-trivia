const ENDPOINT = 'https://www.gravatar.com/avatar/';

async function fetchGravatar(hash) {
  try {
    const response = await fetch(`${ENDPOINT}${hash}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export default fetchGravatar;
