import ActionTypes from './actionTypes';
import { Online, Offline } from '../../../interfaces/Store/Actions/ConnStatusActions.interface';

export function online(): Online {
    return {
        type: ActionTypes.ONLINE,
    }
}

export function offline(): Offline {
    return {
        type: ActionTypes.OFFLINE,
    }
}