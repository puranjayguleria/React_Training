import './App.css';
import React,{Component} from 'react';
import Main from './components/MainComponent'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'; // Redux store becomes avaialble to all application
import {ConfigureStore} from './redux/configureStore';
const store = ConfigureStore();
class App extends Component{


render() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="App">
      <Main/>  {/* Sending state from parent as props to child */}
    </div>
    </BrowserRouter>
    </Provider>
  );
}
}

export default App
