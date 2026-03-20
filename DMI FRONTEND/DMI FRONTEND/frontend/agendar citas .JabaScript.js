function agregarCita() {

    const cliente = document.getElementById("cliente").value;
    const servicio = document.getElementById("servicio").value;
    const hora = document.getElementById("hora").value;

    if(cliente === "" || servicio === "" || hora === ""){
        alert("Complete todos los campos");
        return;
    }

    const columna = document.querySelector(`[data-hora="${hora}"]`);

    if(!columna){
        alert("Hora no disponible en la agenda visual");
        return;
    }

    const cita = document.createElement("div");
    cita.classList.add("cita");
    cita.setAttribute("draggable", "true");
    cita.innerHTML = `<strong>${cliente}</strong><br>${servicio}`;

    cita.addEventListener("dragstart", dragStart);

    columna.appendChild(cita);

    document.getElementById("cliente").value = "";
    document.getElementById("servicio").value = "";
}

function dragStart(e){
    e.dataTransfer.setData("text", e.target.innerHTML);
    e.dataTransfer.setData("class", e.target.className);
    e.target.remove();
}

document.querySelectorAll(".columna").forEach(col => {

    col.addEventListener("dragover", function(e){
        e.preventDefault();
    });

    col.addEventListener("drop", function(e){
        e.preventDefault();

        const contenido = e.dataTransfer.getData("text");

        const nuevaCita = document.createElement("div");
        nuevaCita.classList.add("cita");
        nuevaCita.setAttribute("draggable", "true");
        nuevaCita.innerHTML = contenido;

        nuevaCita.addEventListener("dragstart", dragStart);

        this.appendChild(nuevaCita);
    });

});