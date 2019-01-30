const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    return response.json();
  } catch (error) {
    throw Error(`Error fetching data: ${error.message}`);
  }
}

export default {
  fetchData
}
