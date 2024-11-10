const apiUrl = import.meta.env.VITE_BACK_ROOT;

const login = async (user, contraseña) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        username: user,
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
    let response = await fetch(`${apiUrl}/login`, requestOptions);
    let jsonData = await response.json();
    localStorage.setItem("token", jsonData.access_token);
    console.log(response.status);
    return response.status; // Devuelve los datos obtenidos
};

export default login;