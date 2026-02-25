import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    host: 'benserverplex.ddns.net',
    user: 'alunos',      
    password: 'senhaAlunos',      
    database: 'web_03ma'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados web_03ma com sucesso!');
});


app.post('/produtos', (req, res) => {
    const { nome, descricao, preco, categoria } = req.body;
    const sql = 'INSERT INTO produtos_heitor (nome, descricao, preco, categoria) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [nome, descricao, preco, categoria], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao cadastrar produto.' });
        }
        res.status(201).json({ message: 'Produto cadastrado!', id: result.insertId });
    });
});


app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtos_heitor';
    
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar produtos.' });
        }
        res.json(results);
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});