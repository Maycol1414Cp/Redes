// Función para establecer una cookie
function setCookie(nombre, valor, max_age) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (max_age * 1000)); // Expiración en segundos
    const expiracion = "expires=" + fecha.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expiracion + ";path=/";
}

// Función para obtener una cookie
function getCookie(nombre) {
    const nombreCookie = nombre + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(nombreCookie) === 0) {
            return c.substring(nombreCookie.length, c.length);
        }
    }
    return "";
}

// Función para cargar las preferencias desde las cookies
function loadPreferences() {
    const fontType = getCookie("font_type");
    const fontColor = getCookie("font_color");

    if (fontType !== "") {
        document.body.style.fontFamily = fontType;
        document.getElementById("font_type").value = fontType;
    }
    if (fontColor !== "") {
        document.body.style.color = fontColor;
        document.getElementById("font_color").value = fontColor;
    }
}

// Función para guardar las preferencias seleccionadas en las cookies
function savePreferences() {
    const fontType = document.getElementById("font_type").value;
    const fontColor = document.getElementById("font_color").value;

    // Guardar las cookies por 10 segundos
    setCookie("font_type", fontType, 10);
    setCookie("font_color", fontColor, 10);

    // Actualizar el estilo de la página inmediatamente
    document.body.style.fontFamily = fontType;
    document.body.style.color = fontColor;
}

// Función para guardar los enlaces visitados en una cookie
function trackLinkVisit(link) {
    let visitedLinks = getCookie("visited_links");
    if (visitedLinks === "") {
        visitedLinks = link;
    } else {
        if (!visitedLinks.includes(link)) {
            visitedLinks += "," + link;  // Agregar nuevo enlace si no está ya en la cookie
        }
    }
    setCookie("visited_links", visitedLinks, 10);  // Guardar por 10 segundos
}

// Función para cargar y mostrar los enlaces visitados
function loadVisitedLinks() {
    const visitedLinks = getCookie("visited_links");
    const visitedLinksList = document.getElementById("visited-links-list");

    if (visitedLinks !== "") {
        const linksArray = visitedLinks.split(',');
        linksArray.forEach(link => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = link;
            anchor.textContent = link;
            anchor.target = "_blank";
            listItem.appendChild(anchor);
            visitedLinksList.appendChild(listItem);
        });
    }
}

// Llamar a la función de carga cuando la página se cargue
window.onload = function() {
    loadPreferences();
    loadVisitedLinks();
};
