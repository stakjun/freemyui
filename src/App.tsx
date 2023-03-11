
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' // 全部图标引入，通过字符串
import Alert from './components/Alert/alert';
import Icon from "./components/Icon/icon";
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
library.add(fas);

function App() {
  return (
    <div className="App">
      <Icon icon='coffee' size='10x' theme='danger'/>

      <Alert title='12' />

      <Menu defaultIndex='0'>
        <MenuItem>
            cool link
        </MenuItem>
        <MenuItem>
            cool link 2
        </MenuItem>
        <MenuItem disabled>
            disabled
        </MenuItem>
        <SubMenu title="下拉选项">
            <MenuItem>
                下拉选项一
            </MenuItem>
            <MenuItem>
                下拉选项二
            </MenuItem>
        </SubMenu>
    </Menu>
    </div>
  );
}

export default App;
