import feedRouter from '../routes/feed';
import authRouter from '../routes/auth';
import usersRouter from '../routes/user';

export default (app) => {
    //init routes
    app.use('/auth', authRouter);
    app.use('/feed', feedRouter);
    app.use('/user', usersRouter);
}
