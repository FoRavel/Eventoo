export async function getUser(email){
  try{
    const response = await fetch("http://192.168.0.17/SocialnetworkAuth/testSQL.php?action=connexion",{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        courriel: email
      })
    });
    const responseJson = await response.json();
    return responseJson
  }catch(error){
    console.log(error)
  }
}

export async function insertUser(utilisateur, mode_inscription){

    try{
      if(mode_inscription == "classique"){
        const response = await fetch("http://192.168.0.17/SocialnetworkAuth/testSQL.php?action=insert_User&inscriptionClassique=oui",{
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
          mdp: utilisateur.mdp
        })
      });
      const responseJson = await response.text();
      console.log("INSERT " + responseJson);
      return responseJson;
    }
    //inscription par réseau social pas de paramètres «inscriptionClassique» dans l'url, pas mot de passe mais photo de profil envoyé dans le corps de la requête
    else{
      const response = await fetch("http://192.168.0.17/SocialnetworkAuth/testSQL.php?action=insert_User",{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        numero: utilisateur.numero,
        courriel: utilisateur.courriel,
        photoProfil: utilisateur.photoProfil
      })
    });
    const responseJson = await response.json();
    console.log("INSERT " + responseJson);
    return responseJson;
    }
    }catch(error){
      console.log(error)
    }
}

export async function updateUser(utilisateur, type_profile){
  console.log("PROFILE :" +utilisateur.prenom)
  try{
    if(type_profile == "classique"){
      const response = await fetch("http://192.168.0.17/SocialnetworkAuth/testSQL.php?action=update_User&type_profile=classique",{
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
      const responseJson = await response.text();
      return responseJson;
    }else{

    }
  }catch(error){

  }
}
