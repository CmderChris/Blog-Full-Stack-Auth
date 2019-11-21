export const json = async (uri: string, method: string = 'GET', body?: {}) => {
    const headers: any = {
        'Content-type': 'application/json'
    };

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