import express, { json } from "express";
import cors from "cors";

// Criação do app atraves do express
const app = express();

// Configurações 
app.use(cors());
app.use(json());

// Variáveis Globais
const users = [];
const tweets = [];

//Rotas GET e POST:

//POST /sign-up
app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body
    users.push({ username, avatar });
    res.send("Ok!");
});

//POST /tweets
app.post("/tweets", (req, res) => {

    //Corpo do tweet
    const { username, tweet } = req.body;

    //Verifica se o usuario esta cadastrado varendo a matriz user com o username passado pela body
    const userExists = users.find((user) => user.username === username);

    if (!userExists) return res.send("UNAUTHORIZED");
    
    //Posta o tweet
    tweets.push({ username, tweet });
    res.send("OK");
});

//GET: /tweets
app.get("/tweets", (req, res) => {
    const completeTweets = tweets.map((tweet) => {
        const user = users.find((user) => user.username === tweet.username);
        return { ...tweet, avatar: user.avatar }
    })

    //Coloca a resposta da GET como sendo os ultimos 10 tweets publicados
    res.send(completeTweets.slice(-10).reverse());
});

// Conectar ao servidor na porta 5000
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));