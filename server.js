import path from 'path';
import express from 'express';
import nafilasData from './data/nafilas.json' assert { type: 'json' };


const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join('vues')));

// Endpoint to get Nafilas information for a specific day
app.get('/nafilas/:day', (req, res) => {
    const day = parseInt(req.params.day);
    if (isNaN(day) || day < 1 || day > 30) {
        return res.status(400).json({ error: 'Invalid day number. Day must be between 1 and 30.' });
    }

    // Find the Nafilas information for the specified day
    const nafila = nafilasData.find(item => item.night === day);
    if (!nafila) {
        return res.status(404).json({ error: 'Nafilas information not found for the specified day.' });
    }

    res.json(nafila);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    const url = `http://localhost:${PORT}`;
    console.log(`Server is available at ${url}`);
});
