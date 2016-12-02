import React from 'react';
import ReactDOM from 'react-dom';
import { render, shallow, mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders one ul tag', () => {
  const wrapper = render(<App />);
  expect(wrapper.find('ul').length).toBe(1);
});

it('renders three li tags at the beggining', () => {
  const wrapper = render(<App />);
  expect(wrapper.find('li').length).toBe(3);
});

it('rendered the li with correct text at the beggining', () => {
  const wrapper = shallow(<App />);
  const tasks = ['Sacar la ropa', 'Hacer la cama', 'Leer un rato',]
  expect(wrapper.find('li').length).toBe(3);
  wrapper.find('li').forEach(function(node, i) {
    expect(node.text()).toBe(tasks[i]);
  });
});

it('creates a new task with the correct text', () => {
  const wrapper = mount(<App />);
  const tasks = ['Sacar la ropa', 'Hacer la cama', 'Leer un rato', 'Hola']
  const newTask = wrapper.find('#new-task');
  newTask.node.value = 'Hola';
  newTask.simulate('change', {target: {value: 'Hola'}})
  wrapper.find('form').simulate('submit', newTask)
  expect(wrapper.find('li').length).toBe(4);
  wrapper.find('li').forEach(function(node, i) {
    expect(node.text()).toBe(tasks[i]);
  });
})

it('the text input value is reset after creating task', () => {
  const wrapper = mount(<App />);
  let newTask = wrapper.find('#new-task');
  newTask.node.value = 'Hola';
  newTask.simulate('change', {target: {value: 'Hola'}})
  wrapper.find('form').simulate('submit', newTask)
  expect(wrapper.find('#new-task').node.value).toBe('')
})

it('adds error class to input field when creating a blank task', () => {
  const wrapper = shallow(<App />)
  const newTask = wrapper.find('#new-task');
  wrapper.find('form').simulate('submit', {preventDefault(){}})
  expect(wrapper.find('#new-task').hasClass('error')).toBe(true)
})


it('toggles done classs on li when click', () => {
  const wrapper = shallow(<App />);
  const task = wrapper.find('li').first()
  task.simulate('click')
  expect(wrapper.find('li').first().hasClass('done')).toBe(true)
  task.simulate('click')
  expect(wrapper.find('li').first().hasClass('done')).toBe(false)
})
