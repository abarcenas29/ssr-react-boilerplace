import universal from 'react-universal-component'

const Home = universal(() => import('Containers/Home'))
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
