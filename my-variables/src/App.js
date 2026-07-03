import React from "react";
import Card from "./menucard";
function App(){
  var cafename="Irish"
  function greet(){
    alert("Welcome user")
  }
  return(
    <div>
      <h2>Welcome to {cafename}</h2>
      <h2>Menu</h2>
      <button onClick={greet}>Greeting</button>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>

  )
}
export default App;