import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";


import "./App.css";

import Table from "./Table";
import ReactFileReader from 'react-file-reader';

injectTapEventPlugin();

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headers:[]
    }
    //this.handleFiles = this.handleFiles.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
}

  handleFiles = files => {
    //console.log(files)
    console.log(files[0]);
    var reader = new FileReader();
    reader.onload = function(e) {
    // Use reader.result
    var csv = reader.result;
    var lines = csv.split("\n");
    var result = [];
    var tabHeaders=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(",");
      for(var j=0;j<tabHeaders.length;j++){
        obj[tabHeaders[j]] = currentline[j];
      }
      result.push(obj);
      }  
      
     this.setState({
     data : result,
     headers : tabHeaders
     });
       result= JSON.stringify(result); //JSON
    console.log(result);
  }
  reader.readAsText(files[0]);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
       <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
  <button className='btn'>Upload</button>
      </ReactFileReader>
          <Table
            data={this.state.data}
            header={[
              {
                name: "First name",
                prop: "firstName"
              },
              {
                name: "Last name",
                prop: "lastName"
              },
              {
                name: "Username",
                prop: "username"
              },
              {
                name: "Email",
                prop: "email"
              }
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
