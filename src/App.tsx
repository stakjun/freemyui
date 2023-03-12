
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' // 全部图标引入，通过字符串
import Alert from './components/Alert/alert';
import Icon from "./components/Icon/icon";
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';
import AutoComplete from './components/AutoComplete/autoComplete';
library.add(fas);

function App() {
  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  const handleFetch = (query: string) => {
    return lakers.filter(name => name.includes(query))
  }
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

    <Tabs>
        <TabItem label="tab1">content1</TabItem>
        <TabItem label="tab2">content2</TabItem>
        <TabItem label="disabled" disabled>content3</TabItem>
      </Tabs>

      {/* <AutoComplete fetchSuggestions={handleFetch}/> */}
    </div>
  );
}

export default App;
