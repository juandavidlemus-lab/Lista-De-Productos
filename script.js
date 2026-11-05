let productos = [];

const contenedorProductos = document.getElementById("productos");
const inputNombre = document.getElementById("nombre");
const inputStock = document.getElementById("stock");
const inputPrecio = document.getElementById("precio");
const inputEditId = document.getElementById("edit-id");
const btnCrear = document.getElementById("btnCrear");
const formTitle = document.querySelector(".form-card h2");

function renderizarProductos() {
    contenedorProductos.innerHTML = "";
    
    productos.forEach(prod => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("producto-card");

        tarjeta.innerHTML = `
            <div>
                <h3>${prod.nombre}</h3>
                <p class="producto-precio">$${prod.precio.toLocaleString()}</p>
                <p class="producto-stock">Stock disponible: ${prod.stock}</p>
            </div>
            <div class="card-actions">
                <button class="btn-detalle" onclick="verDetalle(${prod.id})">Detalle</button>
                <button class="btn-editar" onclick="cargarParaEditar(${prod.id})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarProducto(${prod.id})">Eliminar</button>
            </div>
        `;

        contenedorProductos.appendChild(tarjeta);
    });
}

// Cargar desde products.json
async function cargarProductosDesdeJSON() {
    try {
        const respuesta = await fetch('products.json');
        const datos = await respuesta.json();
        productos = datos.products;
        renderizarProductos();
    } catch (error) {
        console.error("Error al cargar products.json:", error);
    }
}

window.verDetalle = function(id) {
    const prod = productos.find(p => p.id === id);
    if (prod) {
        alert(`Detalle del producto:\nNombre: ${prod.nombre}\nPrecio: $${prod.precio.toLocaleString()}\nStock: ${prod.stock}`);
    }
};

window.cargarParaEditar = function(id) {
    const prod = productos.find(p => p.id === id);
    if (prod) {
        inputNombre.value = prod.nombre;
        inputStock.value = prod.stock;
        inputPrecio.value = prod.precio;
        inputEditId.value = prod.id;
        btnCrear.textContent = "Actualizar";
        formTitle.textContent = "Editar Producto";
    }
};

// Función para eliminar un producto
window.eliminarProducto = function(id) {
    productos = productos.filter(p => p.id !== id);
    renderizarProductos();
};

btnCrear.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    const stock = Number(inputStock.value);
    const precio = Number(inputPrecio.value);
    const editId = inputEditId.value;

    if (!nombre || isNaN(stock) || isNaN(precio)) {
        alert("Por favor completa todos los campos correctamente.");
        return;
    }

    if (editId) {
        const index = productos.findIndex(p => p.id == editId);
        if (index !== -1) {
            productos[index].nombre = nombre;
            productos[index].stock = stock;
            productos[index].precio = precio;
        }
        inputEditId.value = "";
        btnCrear.textContent = "Crear";
        formTitle.textContent = "Agregar Productos";
    } else {
        const nuevoProducto = {
            id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
            nombre: nombre,
            precio: precio,
            stock: stock
        };
        productos.push(nuevoProducto);
    }

    renderizarProductos();

    inputNombre.value = "";
    inputStock.value = "";
    inputPrecio.value = "";
});

// Inicializar cargando el archivo JSON
cargarProductosDesdeJSON();