const getData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw Error(`Error fetching data: ${response.error.message}`);
  }
}

const postData = async (data, suffix) => {
  const url = `http://localhost:3000/api/users${suffix}`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  })
  
  if (response.ok) {
    return await response.json()
  } else {
    throw Error(`Error posting data: ${response.statusText}`);
  }
}

const deleteData = async (suffix) => {
  const url = `http://localhost:3000/api/users${suffix}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })

  if (response.ok) {
    return await response.json()
  } else {
    throw Error(`Error deleting data: ${response.error.message}`);
  }
}

export default {
  getData,
  postData,
  deleteData
}
