const socket = io();

if (page === 'products') { //  page se serea desde la vista en habdlebars
	let newProduct = document.getElementById('carga');

function render(data) {
	let html = data
		.map((elem, index) => {
			return `<div id='divProducts' data-id="${index}" >
        <strong>${elem.title}</strong>
        <em>${elem.description}</em>
        <em>${elem.code}</em>
        <em>${elem.price}</em>
        <em>${elem.stock}</em>
        <em>${elem.category}</em>
        <em>${elem.thumbnail}</em>
        <em>${elem.status}</em>
			</div>`;
		})
		.join(' ');

	document.getElementById('realTimeProducts').innerHTML = html;
}

newProduct.addEventListener('submit', (e) => {
	e.preventDefault();
	const product = {
		title: document.getElementById('title').value,
		description: document.getElementById('description').value,
		code: document.getElementById('code').value,
		price: document.getElementById('price').value,
		stock: document.getElementById('stock').value,
		category: document.getElementById('category').value,
		thumbnail: document.getElementById('thumbnail').value,
		status: document.getElementById('status').value,
	};
	socket.emit('carga', product);
	newProduct.reset();
});

socket.on('realTimeProducts', (product) => {
	return render(product);
});
}


// **** chat **** //
if (page === 'chat') { //  page se serea desde la vista en habdlebars
	let user;
const inputMSJ = document.getElementById('msj');
const sendBtn = document.getElementById('sendBtn');

// Identificación del usuario
Swal.fire({
  title: 'Bienvenido',
  input: 'text',
  text: 'Identifícate para participar en el chat',
  icon: 'success',
  inputValidator: (value) => {
    return !value && 'Debes identificarte para participar.';
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit('sayhello', user);
});

// Envío de mensajes
function sendMessage() {
  let msj = inputMSJ.value;
  if (msj.trim().length > 0) {
    socket.emit('message', { user, msj });
    inputMSJ.value = '';
  }
}

sendBtn.addEventListener('click', sendMessage);
inputMSJ.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// Renderizado de mensajes
function renderChat(data) {
  const html = data
    .map((elem) => {
      return `<div>
        <strong>${elem.user}:</strong>
        <em>${elem.msj}</em>
      </div>`;
    })
    .join('');

  document.getElementById('messages').innerHTML = html;
}

socket.on('messages', (data) => {
  renderChat(data);
});

socket.on('connected', (data) => {
  Swal.fire({
    text: `Se ha conectado ${data}`,
    toast: true,
    position: 'top-right',
  });
});

}

