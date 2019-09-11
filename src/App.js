import React from 'react';

function App(props) {
  // console.log(props)  
  // 可以通过props.children来获取组件标签中的内容
  return (
    <div className="App">
      {props.children}
    </div>
  );
}

export default App;
