import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MetaComponent from './components/MetaComponent';

function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
          <li>
            <Link to="/actor">Actor</Link>
          </li>
          <li>
            <Link to="/delayed-actor">Actor (Simulated Loading)</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
        <Route path="/actor" component={Actor} />
        <Route path="/delayed-actor" component={DelayedActor} />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Actor() {
  const data = {
    "@context": "http://schema.org",
    "@type": "Person",
    "url": "http://www.imdb.com/name/nm0626719/",
    "name": "John Nettles",
    "image": "https://m.media-amazon.com/images/M/MV5BMjAyNjI2OTg5Ml5BMl5BanBnXkFtZTcwNDAzMDgxOA@@._V1_.jpg",
    "jobTitle": [
      "Actor",
      "Soundtrack",
      "Writer"
    ],
    "description": "John Nettles has been a familiar face on British and International television screens for over thirty years. From his early beginnings in the UK hit comedy The Liver Birds (1969), he became a household name overnight playing the Jersey detective \"Jim Bergerac\". The series, Bergerac (1981), was a huge hit in Britain and was exported to many ...",
    "birthDate": "1943-10-11"
  };
  return (
    <div>
      <MetaComponent data={data} {...data}/>
      <h2>{data.name}</h2>
    </div>
  )
}

class DelayedActor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actor: null
    }
  }
  componentWillMount() {
    this.getActor().then(actor => this.setState({actor}));
  }
  getActor() {
    const delay = 5000 // ms
    return new Promise(resolve => setTimeout(() => resolve({
      "@context": "http://schema.org",
      "@type": "Person",
      "url": "http://www.imdb.com/name/nm0001492/",
      "name": "Kyle MacLachlan",
      "image": "https://m.media-amazon.com/images/M/MV5BMTg4MzIwNTI1MF5BMl5BanBnXkFtZTgwMjAwNDgxODE@._V1_.jpg",
      "jobTitle": [
        "Actor",
        "Soundtrack",
        "Director"
      ],
      "description": "The \"boy next door, if that boy spent lots of time alone in the basement\", is how Rich Cohen described Kyle MacLachlan in a 1994 article for \"Rolling Stone\" magazine. That distinctly askew wholesomeness made MacLachlan a natural to become famous as the alter ego of twisted director David Lynch. MacLachlan was born and raised in Yakima, Washington, ...",
      "birthDate": "1959-02-22"
    }), delay))
  }
  render() {
    const { actor } = this.state
    return actor ? (
      <div>
        <MetaComponent data={actor}/>
        <h2>{actor.name}</h2>
      </div>
    ) : <div><p>Loading...</p></div>
  }
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}

export default BasicExample;
