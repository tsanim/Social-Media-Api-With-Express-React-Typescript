 // Models
 import User from '../models/User';
 import Notification from '../models/Notification';
 import Message from '../models/Message';
 import Room from '../models/Room';

 import Service from './UsersService';

export default (express, socketio, http, socketPORT, logger) => {
    //init socket io and socket server
    const socketServer = http.createServer(express());
    const io = socketio(socketServer);

    //init UserService
    let UserService = new Service();

    io.on('connection', (socket) => {
        logger.log('info', `User with socket id ${socket.id} is connected`);

        //join to online users (general socket)
        socket.on('join', async ({ userId }) => {
            logger.log('info', `${userId} is online!`);

            let onlineUsers = await UserService.addOnlineUser(userId);

            socket.emit('onlineUsers', { onlineUsers });
        });

        socket.on('onlineUsers', () => {
            // send online user to client
            socket.emit('onlineUsers', { onlineUsers: UserService.getOnlineUsers() })
        });

        socket.on('sendNotification', async ({ notificatedUserId, senderId }) => {
            try {
                const user = await User.findById(notificatedUserId).populate('notifications');
                const sender = await User.findById(senderId);
                let room = await Room.findOne({ pairUsers: { $all: [notificatedUserId, senderId] } });

                // if notificated user hasnt notifications from sender, send new notification to him
                if (!user.notifications.find(n => n.message.includes(sender.username))) {
                    const notification = await Notification.create({
                        message: `${sender.username} wants to text you!`,
                        sender,
                        roomId: room._id,
                    });

                    user.notifications.push(notification);
                    await user.save();
                }
            } catch (error) {
                logger.log('error', `Send notification error: ${error.message}`);
            }
        });

        socket.on('getMessages', async ({ currentUserId, onlineUserId }) => {
            try {
                let room = await Room.findOne({ pairUsers: { $all: [currentUserId, onlineUserId] } }).populate({
                    path: 'messages',
                    populate: {
                        path: 'creator',
                    }
                });

                socket.emit('messages', { messages: room ? room.messages : [] });
            } catch (error) {
                logger.log('error',`Get all messages error: ${error.message}`);
            }
        })

        //join room socket, when client send it from notification
        socket.on('joinSenderRoom', async ({ userId, senderId }) => {
            try {
                const user = await User.findById(userId).populate('notifications');
                const senderUser = await User.findById(senderId).populate('notifications');

                let room = await Room.findOne({ pairUsers: { $all: [userId, senderId] } });
                let roomId = room._doc ? room._doc._id : room._id;

                socket.join(roomId);

                const senderObject = senderUser._doc ? senderUser._doc : senderUser;
                const receiverObject = user._doc ? user._doc : user;

                socket.broadcast.to(roomId).emit('infoMessage', { text: `${receiverObject.username} has joind the chat!` });
                socket.emit('joinSenderRoom', { user: { ...senderObject, roomId } });

                user.notifications = user.notifications.filter(n => n.sender.toString() !== senderId);
                await user.save();
            } catch (error) {
                logger.log('error',`Join sender room error: ${error.message}`);
            }
        });

        socket.on('joinRoom', async ({ userId, senderId }) => {
            try {
                const user = await User.findById(userId).populate('notifications');
                const senderUser = await User.findById(senderId).populate('notifications');

                let room = await Room.findOne({ pairUsers: { $all: [userId, senderId] } });

                // If does not have a room with this two users - create one
                if (!room) {
                    room = await Room.create({
                        pairUsers: [userId, senderId],
                        messages: []
                    });
                }

                let roomId = room._doc ? room._doc._id : room._id;

                socket.join(roomId);

                user.notifications = user.notifications.filter(n => n.sender.toString() !== senderId);
                await user.save();

                let receiverObject = user._doc ? user._doc : user;
                let senderObject = senderUser._doc ? senderUser._doc : senderUser;

                socket.broadcast.to(roomId).emit('infoMessage', { text: `${senderObject.username} has joind the chat!` });
                socket.emit('joinRoom', { user: { ...receiverObject, roomId } });

                logger.log('info',`${senderObject._id} has joind the chat!`);
            } catch (error) {
                logger.log('error',`Join room error: ${error.message}`);
            }

        });

        socket.on('typing', ({ username, roomId }) => {
            socket.broadcast.to(roomId).emit('typing', { username });
        });

        socket.on('stopTyping', ({ roomId }) => {
            socket.broadcast.to(roomId).emit('stopTyping');
        });

        socket.on('sendMessage', async ({ roomId, text, userId }) => {
            try {
                if (text === '') {
                    logger.log('warn',`Can not send empty message!`);

                    socket.to(roomId).emit('error', { message: 'Cannot send empty message!' });
                }

                let message = await Message
                    .create({
                        creator: userId,
                        roomId,
                        text
                    });

                message = await message.populate('creator').execPopulate()

                let room = await Room.findById(roomId);
                room.messages.push(message);
                await room.save();

                io.to(roomId).emit('message', { message });
            } catch (error) {
                logger.log('error',`Error with sending messages! ERROR: ${error.message}`);
            }

        });

        socket.on('leaveRoom', ({ roomId, username }) => {
            socket.leave(roomId);
            socket.broadcast.to(roomId).emit('infoMessage', { text: `${username} left room!` });

            logger.log('info',`${username} left room: ${roomId}`);
        })

        socket.on('disconnect', async ({ userId }) => {
            UserService.removeOnlineUser(userId);

            logger.log('info',`User with socket id ${socket.id} is disconnected`);
        })
    });

    socketServer.listen(socketPORT, () => console.log(`Socket server is listening at port: ${socketPORT}`));
}