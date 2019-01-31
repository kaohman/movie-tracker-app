const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    return response.json();
  } catch (error) {
    throw Error(`Error fetching data: ${error.message}`);
  }
}

const postData = async (user, url) => {
  const root = 'http://localhost:3000';
  try {
    const response = await fetch(root + url, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json'
      }
    })
    return response.json()
  } catch (error) {
    throw Error(`Error posting data: ${error.message}`);
  }
}

export default {
  fetchMovieData,
  postData,
}
