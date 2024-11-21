const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Diretório onde ficam os templates EJS

// Servir arquivos estáticos (CSS, imagens, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
  const document = {
    title: 'Minha Página Dinâmica',
    content: 'Este é o conteúdo que será exibido na textarea.'
  };
  
  // Renderiza o template index.ejs com o objeto document
  res.render('index', { document });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
