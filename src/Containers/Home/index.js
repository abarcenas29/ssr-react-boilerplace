import './styles.scss'
import React, { Component } from 'react'
import { FETCH_DATA_REQUEST_ACTION } from './actions'
import { connect } from 'react-redux'

import homeReducer from './reducer'

export const reducer = { homeReducer }

class Home extends Component {
  componentDidMount () {
    this.props.fetchDataRequest({test: 'I worked'})
  }

  render () {
    return (
      <div className='container'>
        <h1>Hey I'm Home</h1>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDataRequest: payload => dispatch(FETCH_DATA_REQUEST_ACTION(payload)),
  dispatch
})
const mapStatetoProps = state => {
  return {}
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home)
