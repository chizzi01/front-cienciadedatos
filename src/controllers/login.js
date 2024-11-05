const login = async (email, contraseña) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        username: email,
        password: contraseña
      });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        mode: 'cors'
    };

    // const apiUrl = process.env.REACT_APP_API_URL;
    let response = await fetch(`http://127.0.0.1:8000/login`, requestOptions);
    let jsonData = await response.json();
    localStorage.setItem("token", jsonData.access_token);
    console.log(response.status);
    return response.status; // Devuelve los datos obtenidos
};

export default login;