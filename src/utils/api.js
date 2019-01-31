const fetchData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw Error(`Error fetching data: ${response.error.message}`);
  }
}

const postData = async (user, url) => {
  const root = 'http://localhost:3000';
  const response = await fetch(root + url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json'
    }
  })
  console.log(response)
  if (response.ok) {
    return response.json()
  } else {
    throw Error(`Error posting data: ${response.error.message}`);
  }
}

export default {
  fetchData,
  postData,
}
