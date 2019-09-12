import React from 'react';
import Main from './components/MainComponent';
import './App.css';


class App extends React.Component{


  render() {
    return (
      <div>
        <Main/>
      </div>
    );
  }  
}
//Menu is self closing 
//can present datetime using java {new Intl.DateTimeFormat('en-US',{year:'numeric', month:'short', day: '2-digit'}).format(new Date(Date.parse(comment.date))) {comment.date})}
export default App;
