const initialState = {
  utilisateur: null
}

function editerProfile(state = initialState, action){
  let nextState
  switch(action.type){
    case 'SET_CURRENT_USER':
      nextState = {
        ...state, utilisateur: action.value
      }
      console.log("REDUCER "+ action.value.id)
      console.log("REDUCER "+ action.value.prenom)
      return nextState || state
    default:
      return state
  }
}

export default editerProfile;
