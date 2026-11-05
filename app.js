const data = {
  "products": [
    {
      "id": 1,
      "nombre": "Arroz",
      "precio": 3000,
      "stock": 10
    },
    {
      "id": 2,
      "nombre": "Huevo",
      "precio": 600,
      "stock": 30
    }
  ]
};

// Buscamos el contenedor donde se van a mostrar los productos en el HTML
const contenedor = document.getElementById('lista-productos');

if (contenedor) {
  // Recorremos el arreglo "products" usando el método map y comillas invertidas (``)
  contenedor.innerHTML = data.products.map(producto => `
    <div class="product-card">
      <h3>${producto.nombre}</h3>
      <p class="precio">$${producto.precio.toLocaleString()}</p>
      <p class="stock">Stock disponible: <span>${producto.stock}</span></p>
    </div>
  `).join('');
}