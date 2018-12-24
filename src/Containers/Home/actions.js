import { FETCH_DATA_REQUEST } from './constants'

export const FETCH_DATA_REQUEST_ACTION = payload => {
  console.log('action shot')
  return {
    type: FETCH_DATA_REQUEST_ACTION,
    payload
  }
}
