import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requireAuth } from "./middleware/auth";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cool-notes-app.vercel.app",
      "cool-notes-74vmuyc4x-yenxxxw.vercel.app",
    ],
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 20 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_URL,
    }),
  })
);

app.use("/api/notes", requireAuth, notesRoutes);

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
