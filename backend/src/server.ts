import express, { Application, Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port: Number = 8000;

app.use(express.json());
app.use(cors({ origin: true }));

app.post("/auth", async (req: Request, res: Response) => {
    const { username } = req.body;

    try {
        const response = await axios.put(
            'https:/api.chatengine.io/users/',
            { username: username, secret: username, first_name: username },
            { headers: { "private-key": process.env.CHATENGINEAUTH }}
        )

        return res.status(response.status).json(response.data)
    } catch (error: any) {
        return res.status(error.response.status).json(error.response.data)
    }   
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})