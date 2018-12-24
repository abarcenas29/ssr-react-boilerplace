import universal from 'react-universal-component'

const Home = universal(() => import('Containers/Home'), {
  onLoad (module, info, props, context) {
    if (module.reducer) {
      console.log(module.reducer)
      context.store.injectReducers(module.reducer)
    }
  }
})
const About = universal(() => import('Containers/About'))

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/about',
    component: About,
    exact: true
  }
]

export default routes
