export default {
  state: {
  },

  actions: {
    get: function(id, force) {
      const { getState } = this

      if(id && (force || !getState().users[id])) {
        window.io.emit('<user', id)
      }
    },
    update: function(user={}) {
      const { dispatch } = this

      dispatch({
        type: 'users/save',
        payload: user
      })
    },
  },

  reducers: {
    save: (state, payload) => {
      return {
        ...state,
        ...payload
      }
    }
  }
}