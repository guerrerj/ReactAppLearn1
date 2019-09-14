import React from 'react';
import Main from './components/MainComponent';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'; // make available the store
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore(); 
// Need connect for application to react store
class App extends React.Component{
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Main/>
      </div>
      </BrowserRouter>
      </Provider>
    );
  }  
}
//Menu is self closing 
//can present datetime using java {new Intl.DateTimeFormat('en-US',{year:'numeric', month:'short', day: '2-digit'}).format(new Date(Date.parse(comment.date))) {comment.date})}
export default App;
