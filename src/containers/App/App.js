import React, { Component } from 'react';
import '../../normalize.css';
import '../../main.scss';
import { connect } from 'react-redux';
import { getMovies } from '../../actions';
import API from '../../utils/api';
import { apiKey } from '../../utils/api-key';

class App extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount = async () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
    const movies = await API.fetchData(url);
    await this.props.getMovies(movies.results);
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Tracker</h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMovies: (movies) => dispatch(getMovies(movies)),
})

export default connect(null, mapDispatchToProps)(App);
