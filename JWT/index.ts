import * as express from 'express';
import { Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    }
];

app.get('/posts', (req: Request, res: Response) => {
    res.json(posts.filter(post => post.username === req.user?.name));
});

let refreshTokens: string[] = [];

app.post('/token', (req: Request, res: any) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: jwt.VerifyErrors | null, user: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = genAccTk({ name: user.name });
        res.json({ accessToken: accessToken });
    });
});

app.delete('/logout', (req: Request, res: Response) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
});

app.post('/login', (req: Request, res: Response) => {
    // Authenticate User

    const username = req.body.username;
    const user = { name: username };

    const accessToken = genAccTk(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!);
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function genAccTk(user: any) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '10s' }); // 10-15 min
}
app.listen(4000);
  