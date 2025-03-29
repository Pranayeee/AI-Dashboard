import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


app.get('/api/models', (req, res) => {
    res.json([
        { id: 1, name: 'GPT-3', type: 'text' },
        { id: 2, name: 'DALL-E', type: 'image' },
        { id: 3, name: 'Codex', type: 'code' }
    ]);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});