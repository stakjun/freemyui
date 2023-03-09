import React from 'react';
import Alert, { AlertType } from './components/Alert/alert';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <Button className='yes'>hello</Button>
      <Button autoFocus onClick={() => alert(1)} btnType={ButtonType.Primary} size={ButtonSize.Small} >hello</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>hello</Button>
      <Button btnType={ButtonType.Link} href='http://www.baidu.com' target="_blank">baidu</Button>
      <Button btnType={ButtonType.Link} href='http:www.baidu.com'>baidu</Button>

      <Alert
        title='123'
        type={AlertType.Default}
        className='myAlert'
      />
      <Alert
        title='123'
        type={AlertType.Warning}
        className='myAlert'
      />
      <Alert
        title='123'
        type={AlertType.Success}
        className='myAlert'
        description='hah '
      />
      <Alert
        title='124'
        type={AlertType.Danger}
        description='我的'
        closable={true}
        onClose={() => { console.log(1) }}
      />

      <Menu defaultOpenSubMenus={['1']} mode="vertical">
        <MenuItem>
          link1
        </MenuItem>
        <MenuItem disabled>
          link2
        </MenuItem>
        <SubMenu title='副菜单'>
          <MenuItem>
            标题1
          </MenuItem>
          <MenuItem>
            标题2
          </MenuItem>
        </SubMenu>
        <MenuItem>
          link3
        </MenuItem>
        {/* <li>2</li> */}
      </Menu>
    </div>
  );
}

export default App;
