import { csrfFetch } from './csrf'

const GET_ALL_REVIEWS = 'studios/getReviews'
const DELETE_REVIEW = 'studios/deleteReview'
const UPDATE_REVIEW = 'studios/updateReview'
const CREATE_REVIEW = 'studios/createReview'

const getAllReviews = (studioId) => ({
  type: GET_ALL_REVIEWS,
  payload: studioId,
})

const createReview = (payload) => ({
  type: CREATE_REVIEW,
  payload: payload,
})

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: reviewId,
})

const updateReview = (payload) => ({
  type: UPDATE_REVIEW,
  payload: payload,
})

export const thunkGetAllReviews = (studioId) => async (dispatch) => {
  const res = await csrfFetch(`/api/studios/${studioId}/reviews`)
  if (res.ok) {
    const data = await res.json()
    console.log(data)
    if (data.errors) {
      return
    }
    dispatch(getAllReviews(data))
  }
}

export const thunkUpdateReview = (payload, reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (res.ok) {
    const updatedReview = await res.json()
    dispatch(updateReview(updatedReview))
    return updatedReview
  } else {
    const error = await res.json()
    throw new Error(error.message)
  }
}

export const thunkCreateReview = (payload, studioId) => async (dispatch) => {
  const response = await csrfFetch(`/api/studios/${studioId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (response.ok) {
    const review = await response.json()
    dispatch(createReview(review))
    return review
  } else {
    const error = await response.json()
    throw new Error(error.message)
  }
}

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  })

  if (res.ok) {
    dispatch(deleteReview(reviewId))
  } else {
    const error = await res.json()
    throw new Error(error.message)
  }
}

const initialState = {}

function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_REVIEWS: {
      let nextState = {}
      action.payload.Reviews.forEach((value) => {
        nextState[value.id] = value
      })
      return {
        ...nextState,
      }
    }
    case CREATE_REVIEW: {
      let newState = structuredClone(state)
      const review = action.payload
      newState[review.id] = review
      return newState
    }
    case UPDATE_REVIEW: {
      let newState = structuredClone(state)
      const review = action.payload
      newState[review.id] = review
      return newState
    }
    case DELETE_REVIEW: {
      let newState = structuredClone(state)
      delete newState[action.payload]
      return newState
    }
    default:
      return state
  }
}

export default reviewsReducer
