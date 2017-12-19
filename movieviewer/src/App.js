import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/api/movies")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ movies: data });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="Header">
            <h1>Movie List</h1>
          </div>
          <div className="Navigation">
            <ul>
          {this.state.movies.map(movie => {
            return (
              <Nav key={movie.id} id={movie.id} movieTitle={movie.title} />
            );
          })}
          <li><NavLink to='/new' exact>Add Movie</NavLink></li>
          </ul>
          </div>
          <div className="Content">
          <Route path="/movie/:id" component={MovieView} />
          <Route path="/new" component={NewMovie} exact/></div>
        </div>
      </BrowserRouter>
    );
  }
}

class MovieView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {stars:[]}
    };
  }
  componentWillReceiveProps(nextProps) {
    this.getMovie(nextProps.match.params.id);
  }
  componentDidMount() {
    this.getMovie(this.props.match.params.id);
  }
  getMovie(id) {
    fetch(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ movie: data });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <div className="movieView">
        <h3>{this.state.movie.title}</h3>
        <p>Director:{this.state.movie.director}</p>
        <p>Metascore: {this.state.movie.metascore}</p>
        {/* <ul> */}
          
          Stars:
          {this.state.movie.stars.map((star) => {
            return (
              <li className="list" key={star}>{star}</li>
            )
          })}
        {/* </ul> */}
      </div>
    );
  }
}

function Nav(props) {
  return (
    <div className="nav">
      <li>
      <NavLink to={`/movie/${props.id}`}>{props.movieTitle.substr(0, 21)}</NavLink>
      </li>
    </div>
  );
}
class NewMovie extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      director: '',
      metascore: 0,
      stars: []
    }
  }
  render() {
  return (
    <div className="NewMovie">
      <form>
        <input type="text" placeholder="Moive title"/>
        <input type="text" placeholder="Movie director"/>
        <input type="number" placeholder="New Metascore"/>
        <input type="text" placeholder="Stars"/>
        <button type="submit">Add new movie</button>
      </form>
    </div>
  )
}
}
export default App;
