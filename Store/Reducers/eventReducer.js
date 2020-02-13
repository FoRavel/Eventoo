const initialState = {
    titre: null,
    adresse: null,
    nomLieu: null,
    details: null,
    dateHeureDeb: null,
    dateHeureFin: null,
    invites: [],
    genre: null,
    listeProduits: [],
    idOrganisateur: null
}

function mettreAJourEvent(state = initialState, action){
  let nextState;
  switch(action.type){
    case 'CESTPARTI':
      nextState = state;
      nextState.titre = action.value.titre;
      nextState.details = action.value.details;
      nextState.genre = action.value.genre;
      nextState.idOrganisateur = action.value.idOrganisateur;
      /*
      nextState = {
        titre: action.value.titre,
        adresse: null,
        details: action.value.details,
        dateHeureDeb: null,
        dateHeureFin: null,
        invites: [],
        genre: action.value.genre,
      }*/
      console.log("CESTPARTI: "+ nextState.titre);
    return nextState || state
    break;
    case 'QUAND':
      nextState = state;
      nextState.dateHeureDeb = action.value;
      /*
      nextState = {
        titre: action.value.titre,
        adresse: null,
        details: action.value.details,
        dateHeureDeb: null,
        dateHeureFin: null,
        invites: [],
        genre: action.value.genre,
      }*/
      console.log("QUAND: "+ nextState.dateHeureDeb);
    return nextState || state
    break;
    case 'ADD_INVITE':
      nextState = state;
      nextState.invites = state.invites.concat(action.value);
      /*
      nextState = {
        titre: state.titre,
        adresse: state.adresse,
        details: state.details,
        dateHeureDeb: state.dateHeureDeb,
        dateHeureFin: state.dateHeureFin,
        invites: state.invites.concat(action.value),
        genre: state.genre
      }*/
      console.log("ADD_INVITE: "+ nextState.invites);
    return nextState || state
    break;
    case 'REMOVE_INVITE':
      nextState = state;
      array = state.invites;
      var index = array.indexOf(action.value);
      if (index > -1) {
        array.splice(index, 1);
      }
      nextState.invites = array;
      /*
      nextState = {
        titre: state.titre,
        adresse: state.adresse,
        details: state.details,
        dateHeureDeb: state.dateHeureDeb,
        dateHeureFin: state.dateHeureFin,
        invites: array,
        genre: state.genre
      }*/

    return nextState || state
    break;
    case 'SET_ADRESSE':
      console.log("SET_ADRESSE: "  + action.value.nom_lieu);
      nextState = state;
      nextState.adresse = action.value.adresse;
      nextState.nomLieu = action.value.nom_lieu;
      console.log("SET_ADRESSE: "+ nextState.adresse);
      return nextState || state
    break;
    case 'ADD_PRODUITS':
      nextState = state;
      nextState.listeProduits = action.value;
      console.log("ADD_PRODUITS: "+ nextState.listeProduits);
      return nextState || state
    break;
    default:
      return state
  }

}

export default mettreAJourEvent;
