export let Token: string = localStorage.getItem('token') || null

export let Author: any = {
    authorid: localStorage.getItem('authorid') || null,
    role: localStorage.getItem('role') || null
}

export const json = async (uri: string, method: string = 'GET', body?: {}) => {
    const headers: any = {
        'Content-type': 'application/json'
    };
    if (Token) {
        headers['Authorization'] = `Bearer ${Token}`
    }
    try {
        let r = await fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        if (r.ok) {
            return await r.json();
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const setStorage = (token: string, author: {} = {authorid: undefined, role: undefined}) => {
    Token = token;
    Author = author;
    localStorage.setItem("token", token);
    localStorage.setItem("authorid", Author.authorid);
    localStorage.setItem("role", Author.role);
}