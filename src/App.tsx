import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <Button className='yes'>hello</Button>
      <Button autoFocus onClick={() => alert(1)} btnType={ButtonType.Primary} size={ButtonSize.Small} >hello</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>hello</Button>
      <Button btnType={ButtonType.Link}  href='http://www.baidu.com' target="_blank">baidu</Button>
      <Button btnType={ButtonType.Link}  href='http:www.baidu.com'>baidu</Button>
    </div>
  );
}

export default App;
