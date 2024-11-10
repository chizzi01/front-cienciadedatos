const apiUrl = import.meta.env.VITE_BACK_ROOT;

const postFormularioDiabetes = async (saludGeneral, presionArterial, BMI, dificultadCaminar,colAlto,edad,  enfermedadCardiaca, saludFisica, ultimoAnoAlMedico) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "GenHlth": saludGeneral, // Salud general
        "HighBP": presionArterial, // Presión arterial alta
        "BMI": BMI, //Indice de masa corporal
        "DiffWalk": dificultadCaminar, //Dificultad para caminar
        "HighChol": colAlto, //Colesterol alto
        "Age": edad, //Edad
        "HeartDiseaseorAttack": enfermedadCardiaca, //Enfermedad cardiaca
        "PhysHlth": saludFisica, //Salud fisica
        "Income": 4, //Ingresos
        "Education": 3, //Educacion
        "ultimo_ano_al_medico": ultimoAnoAlMedico //Si fue al medico en el ultimo año
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // const apiUrl = process.env.REACT_APP_API_URL;
    let response = await fetch(`${apiUrl}/predict-diabetes`, requestOptions);
    let jsonData = await response.json();
    console.log(jsonData);
    return jsonData; // Devuelve los datos obtenidos
};

export default postFormularioDiabetes;