//https://ilx1412.phpnet.org/testSQL.php?action=get_Event

//https://ilx1412.phpnet.org
export async function getUser(email, mdp){
  try{
    const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=connexion",{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        courriel: email,
        mdp: mdp
      })
    });
    const responseJson = await response.json();
    console.log("getUser: "+responseJson);
    return responseJson
  }catch(error){
    console.log(error)
  }
}


export async function insertUser(utilisateur){

    try{
        const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=insert_User",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          nom: utilisateur.nom,
          prenom: utilisateur.prenom,
          courriel: utilisateur.courriel,
          numero: utilisateur.numero,
          mdp: utilisateur.mdp,
          photo: utilisateur.photo_profil
        })
      });
      const responseJson = await response.json();
      console.log("INSERT " + responseJson);
      return responseJson;

    }catch(error){
      console.log(error)
    }
}


export async function updateUser(utilisateur){
  try{
      const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=update_User",{
        method: "POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: utilisateur.id,
          nom: utilisateur.nom,
          prenom: utilisateur.prenom,
          numero: utilisateur.numero,
          courriel: utilisateur.courriel,
          photoProfil: utilisateur.photoProfil
        })
      });
      const responseJson = await response.json();
      return responseJson;
  }catch(error){

  }
}

export async function getContact(numero){

  try{
      const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=get_Contact",{
        method: "POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numero: numero
        })
      });
      const responseJson = await response.json();
      return responseJson;
  }catch(error){
    console.log(error);
  }
}

export async function getAllGenre(){
  try{
    let response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=select_Genre");
    let responseJson = await response.json();
    return responseJson;
    console.log(responseJson);
  }catch(error){
    console.log(error);
  }
}

export async function insertInvite(idUser, idEvent){
  console.log("insertInvite: " + idUser);
  try{
      const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=insert_est_invite",{
        method: "POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idEvent: idEvent,
          idUtilisateur: idUser
        })
      });
      const responseJson = await response.json();
      return responseJson;
  }catch(error){
    console.log(error);
  }
}

export async function deleteInvite(idUser){

  try{
      const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=delete_est_invite",{
        method: "POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idUtilisateur: idUser
        })
      });
      const responseJson = await response.json();
      return responseJson;
  }catch(error){
    console.log(error);
  }
}

export async function getListInvites(idEvent){
  try{
      const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=get_listInvites",{
        method: "POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idEvent: idEvent
        })
      });
      const responseJson = await response.json();
      return responseJson;
  }catch(error){
    console.log(error);
  }
}


export async function insertEvent(event){
  console.log("INSERT EVENT: " + event.nomLieu);

  try{
    const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=insert_Event",{
      method: "POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titre: event.titre,
        adresse: event.adresse,
        nomLieu: event.nomLieu,
        details: event.details,
        dateHeureDeb: event.dateHeureDeb,
        dateHeureFin: null,
        genre: event.genre
        /*
        invites: event.invites,
        idOrganisateur: event.idOrganisateur
        */
      })
    });
    const responseJson = await response.json();
    console.log("INSERT EVENT LAST ID: " + responseJson);
    return responseJson;
  }catch(error){
    console.log(error);
  }
}

export async function getEvent(id){
  console.log("getEvent id " + id);
  try{
    const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=get_Event",{
      method: "POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    });
    const responseJson = await response.json();
    console.log("getEvent " + responseJson);
    return responseJson;
  }catch(error){
    console.log(error);
  }
}

export async function getMyEvents(idUser){
  console.log("getMyEvents: " + idUser)
  try{
    const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=get_MyEvents",{
      method: "POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idUser: idUser
      })
    });
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  }catch(error){
    console.log(error);
  }
}

export async function insertOrganise(idUser, idEvent){
  console.log("insertOrganise: " + idUser);
  console.log("insertOrganise: " + idEvent);
  try{
    const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=insert_Organizer",{
      method: "POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idEvent: idEvent,
        idUtilisateurOrg: idUser
        /*
        idEvent:
        */
      })
    });
    const responseJson = await response.json();
    console.log("insertOrganise: " + responseJson);
    return responseJson;
  }catch(error){
    console.log(error);
  }
}

export async function insertChecklist(idEvent){
  try{
    const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=insert_Checklist",{
      method: "POST",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idEvent: idEvent
      })
    });
    const responseJson = await response.json();
    console.log("LAST_INSERT_ID CHECKLIST: " + responseJson);
    return responseJson;
  }catch(error){
    console.log(error);
  }
}

export async function insertProduit(produit){
  console.log("LAST_INSERT_ID PRODUIT LABEL: " + produit.label);
  console.log("LAST_INSERT_ID PRODUIT: " + produit.quantite);
  try{
    const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=insert_Produit",{
      method: "POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        label: produit.label,
        quantite: produit.quantite
        /*
        idEvent:
        */
      })
    });
    const responseJson = await response.json();
    console.log("LAST_INSERT_ID PRODUIT: " + responseJson);
    return responseJson;
  }catch(error){
    console.log(error);
  }
}

export async function insertCompose(idProduit, idChecklist){
  try{
    const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=insert_Compose",{
      method: "POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idProduit: idProduit,
        idChecklist: idChecklist
      })
    });
    const responseJson = await response.json();
    console.log("INSERT COMPOSE: " + responseJson);
    return responseJson;
  }catch(error){
    console.log(error);
  }
}

export async function getChecklist(idEvent){
  console.log("GET CHECKLIST ID EVENT: " + idEvent);
  try{
    const response = await fetch("https://ilx1412.phpnet.org/testSQL.php?action=get_Checklist",{
      method: "POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idEvent: idEvent
      })
    });
    const responseJson = await response.json();
      console.log("GET CHECKLIST: " + responseJson);
    return responseJson;
  }catch(error){
    console.log(error);
  }
}
