import { ComponentMeta, ComponentStory } from "@storybook/react";
import Button from "./button";

const buttonMeta: ComponentMeta<typeof Button> = {
    title: 'Button',
    component: Button,
}
export default buttonMeta;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}></Button>;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Button'
};
Default.storyName = '默认按钮样式';

export const ButtonWithSize: ComponentStory<typeof Button> = () => (
    <>
        <Button size="lg">large Button</Button>    
        <Button size="sm">small Button</Button>    
    </>
)
ButtonWithSize.storyName = '不同尺寸的按钮';

export const ButtonWithType: ComponentStory<typeof Button> = () => (
     <>
        <Button btnType="primary">primary Button</Button>    
        <Button btnType="danger">danger Button</Button>    
        <Button btnType="link">link Button</Button>  
    </>    
)
ButtonWithType.storyName = '不同类型的按钮';
  