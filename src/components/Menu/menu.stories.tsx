import { ComponentMeta, ComponentStory } from "@storybook/react";
import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const menuMeta: ComponentMeta<typeof Menu> = {
    title: 'Menu',
    component: Menu,
    subcomponents: { 'SubMenu': SubMenu, 'MenuItem': MenuItem },
}

export default menuMeta;

const Template: ComponentStory<typeof Menu> = (args) => (
    <Menu defaultIndex='0' {...args} >
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
);

export const DefaultMenu = Template.bind({});
DefaultMenu.storyName = '默认Menu';

export const ClickMenu = Template.bind({});
ClickMenu.args = {
    mode: 'vertical'
};
ClickMenu.storyName = '纵向Menu';

export const COpenedMenu = Template.bind({});
COpenedMenu.args = {
    mode: 'vertical',
    defaultOpenSubMenus: ['3']
};
COpenedMenu.storyName = '默认展开的纵向menu';