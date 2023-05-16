const socket = io();

function render(data) {
	// Genero el html
	const html = data
		.map((elem, index) => {
			// Recorro el array de mensajes y genero el html
			return `<div>
				<strong>${elem.title}:</strong>
                <em>${elem.price}</em>
            </div>`;
		})
		.join(' '); // Convierto el array de strings en un string

	// Inserto el html en el elemento con id messages
	document.getElementById('realTimeProducts').innerHTML = html;
}

socket.on('realTimeProducts', (data) => {
	render('data');
});



