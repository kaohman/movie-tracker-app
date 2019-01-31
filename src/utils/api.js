const fetchData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw Error(`Error fetching data: ${response.error.message}`);
  }
}

const postData = async (user, root) => {
  const url = `http://localhost:3000/api/users${root}`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json'
    }
  })
  console.log(response)
  if (response.ok) {
    return await response.json()
  } else {
    throw Error(`Error posting data: ${response.error.message}`);
  }
}

export default {
  fetchData,
  postData,
}
