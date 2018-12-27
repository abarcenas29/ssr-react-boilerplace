import { FETCH_DATA_REQUEST } from './constants'

export const FETCH_DATA_REQUEST_ACTION = payload => {
  return {
    type: FETCH_DATA_REQUEST,
    payload
  }
}
