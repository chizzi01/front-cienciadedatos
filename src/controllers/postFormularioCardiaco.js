const apiUrl = import.meta.env.VITE_BACK_ROOT;

const postFormularioCardiaco = async (hba1c, glucosa, BMI, Age) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "HbA1cLevel": hba1c, // Salud general
        "BloodGlucoseLevel": glucosa, // Presión arterial alta
        "Age": Age, //
        "BMI": BMI, //
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // const apiUrl = process.env.REACT_APP_API_URL;
    let response = await fetch(`${apiUrl}/predict-cardiaco`, requestOptions);
    let jsonData = await response.json();
    console.log(jsonData);
    return jsonData; // Devuelve los datos obtenidos
};

export default postFormularioCardiaco;