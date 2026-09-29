const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Livros funcionando!",
        rotas: [
            "GET /livros",
            "GET /livros/:id",
            "POST /livros",
            "PUT /livros/:id",
            "DELETE /livros/:id"
        ]
    });
});

// Lista de livros
let livros = [
    {
        id: 1,
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        ano: 1899
    },
    {
        id: 2,
        titulo: "O Senhor dos Anéis",
        autor: "J. R. R. Tolkien",
        ano: 1954
    }
];

// Listar todos os livros
app.get("/livros", (req, res) => {
    res.json(livros);
});

// Consultar livro pelo ID
app.get("/livros/:id", (req, res) => {
    const id = Number(req.params.id);

    const livro = livros.find(livro => livro.id === id);

    if (!livro) {
        return res.status(404).json({
            mensagem: "Livro não encontrado"
        });
    }

    res.json(livro);
});

// Cadastrar livro
app.post("/livros", (req, res) => {
    const { titulo, autor, ano } = req.body;

    if (!titulo || !autor || !ano) {
        return res.status(400).json({
            mensagem: "Título, autor e ano são obrigatórios"
        });
    }

    const novoLivro = {
        id: livros.length > 0 ? livros[livros.length - 1].id + 1 : 1,
        titulo: titulo,
        autor: autor,
        ano: ano
    };

    livros.push(novoLivro);

    res.status(201).json(novoLivro);
});

// Atualizar livro
app.put("/livros/:id", (req, res) => {
    const id = Number(req.params.id);

    const livro = livros.find(livro => livro.id === id);

    if (!livro) {
        return res.status(404).json({
            mensagem: "Livro não encontrado"
        });
    }

    const { titulo, autor, ano } = req.body;

    if (!titulo || !autor || !ano) {
        return res.status(400).json({
            mensagem: "Título, autor e ano são obrigatórios"
        });
    }

    livro.titulo = titulo;
    livro.autor = autor;
    livro.ano = ano;

    res.json(livro);
});

// Excluir livro
app.delete("/livros/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = livros.findIndex(livro => livro.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Livro não encontrado"
        });
    }

    const livroExcluido = livros.splice(indice, 1);

    res.json({
        mensagem: "Livro excluído com sucesso",
        livro: livroExcluido[0]
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});