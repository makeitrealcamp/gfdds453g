import React from 'react';
import ReactDOM from 'react-dom';
import { render, shallow, mount } from 'enzyme';
import {Router, Route, hashHistory, IndexRedirect, createMemoryHistory} from 'react-router'
import { Simulate } from 'react-addons-test-utils'
import {App, Page1, Page2, NotFound} from './App';
import Setup from './Setup';

const { click } = Simulate


const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='/page1'/>
      <Route path='/page1' component={Page1}/>
      <Route path='/page2' component={Page2}/>
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>
)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders Pagina 1 on load', () => {
  const wrapper = mount(routes)
  expect(wrapper.find('h1').text()).toBe('Pagina 1')
})

it('changes to Page2 component when clicking on page2 button', () => {
  const wrapper = mount(routes)
  click(wrapper.find('a[href="#/page2"]').get(0), { button: 0 })
  expect(wrapper.find('h1').text()).toBe('Pagina 2')
})

it('changes to Page1 component when clicking on page1 button', () => {
  const wrapper = mount(routes)
  click(wrapper.find('a[href="#/page2"]').get(0), { button: 0 })
  expect(wrapper.find('h1').text()).toBe('Pagina 2')
  click(wrapper.find('a[href="#/page1"]').get(0), { button: 0 })
  expect(wrapper.find('h1').text()).toBe('Pagina 1')
})

it('shows a not found page on routes that are not handle', () => {
  const wrapper = mount(
      <Router history={createMemoryHistory('/NoExiste')}>
      <Route path='/' component={App}>
        <IndexRedirect to='/page1'/>
        <Route path='/page1' component={Page1}/>
        <Route path='/page2' component={Page2}/>
        <Route path='*' component={NotFound}/>
      </Route>
    </Router>
  )
  expect(wrapper.find('h1').text()).toBe('Pagina no encontrada')
})
