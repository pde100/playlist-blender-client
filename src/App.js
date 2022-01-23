import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';

const code = new URLSearchParams(window.location.search).get('code');


function App() {

  if(code) {
    return <Dashboard code={code} />;
  } else {
    return <Login/>;
  }

}

export default App;
