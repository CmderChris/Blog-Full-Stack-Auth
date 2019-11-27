import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import DB from '../../db';

// export const CreateToken = async (payload: IPayload) => {
//     let tokenid: any = await DB.tokens.insert(payload.userid);
//     payload.accesstokenid = tokenid.insertId;
//     payload.unique = crypto.randomBytes(32).toString('hex');
//     let token = await jwt.sign(payload, config.auth.secret);
//     await DB.tokens.update(token, payload.accesstokenid);
//     return token;
// };

export const CreateToken = async (payload: IPayload) => {
    try {
        let { insertId } = await DB.tokens.insert(payload.authorid);
        payload.tokenid = insertId;
        payload.unique = crypto.randomBytes(32).toString('hex');
        let token = await jwt.sign(payload, config.auth.secret);
        await DB.tokens.update(token, payload.tokenid);
        return token;
    } catch (error) {
        console.log(error);
    }
}

export const ValidToken = async (token: string) => {
    let payload: IPayload = <IPayload>jwt.verify(token, config.auth.secret);
    let [accesstokenid] = await DB.tokens.findOne(payload.tokenid, token);
    if (!accesstokenid) {
        throw new Error('Invalid Token!');
    } else {
        return payload;
    }
};

export interface IPayload {
    [key: string]: any;
    authorid: number;
    tokenid?: number;
    unique?: string;
}