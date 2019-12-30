import { SocketIO, Server } from 'mock-socket';
import { getRoomMessages } from '../chatService';

describe('Chat service', () => {
    it('getRoomMessages - should return array of messeges', async (done) => {
        const mockedMessages = ['m1', 'm2'];
        const fakeURL = 'ws://localhost:8080';
        const mockServer = new Server(fakeURL);
        let socket = new SocketIO(fakeURL);

        mockServer.on('connection', socket => {
            socket.join('room');

            socket.on('getMessages', ({ userId1, userId2 }) => {
                socket.to('room').emit('messages', { messages: mockedMessages });
            });
        });


        const messages = await getRoomMessages(socket, '123', '321')
        expect(mockedMessages).toEqual(messages);
        done();

    });
});