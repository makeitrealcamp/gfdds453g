import React from 'react';
import ReactDOM from 'react-dom';
import { render, shallow, mount } from 'enzyme';
import {
  BrowserRouter as Router,
  MemoryRouter,
} from 'react-router-dom';
import { App, Page1, Page2, NotFound } from './App';
import Setup from './Setup';

const routes = (
  <Router>
    <App />
  </Router>
)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(routes, div);
});

it('renders Pagina 1 on load', () => {
  const wrapper = mount(routes)
  expect(wrapper.find('h1').text()).toBe('Pagina 1')
})

it('changes to Page2 component when clicking on page2 button', () => {
  const wrapper = mount(routes);
  wrapper.find('a[href="/page2"]').simulate('click', { button: 0 })
  expect(wrapper.find('h1').text()).toBe('Pagina 2');
})

it('changes to Page1 component when clicking on page1 button', () => {
  const wrapper = mount(routes)
  wrapper.find('a[href="/page2"]').simulate('click', { button: 0 })
  expect(wrapper.find('h1').text()).toBe('Pagina 2')
  wrapper.find('a[href="/page1"]').simulate('click', { button: 0 })
  expect(wrapper.find('h1').text()).toBe('Pagina 1')
})

it('shows a not found page on routes that are not handle', () => {
  const wrapper = mount(
    <MemoryRouter
      initialEntries={['/noExiste']}
      initialIndex={0}
    >
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find('h1').text()).toBe('Pagina no encontrada')
})
