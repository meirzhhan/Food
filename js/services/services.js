const postData = async (url, data) => { // Возвращает Promise fetch-а. Async - внутри функции асинхронный код
    const res = await fetch(url, { //await -ждёт результат запроса
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data   
    }); 
    return await res.json(); //await - ждёт окончания promise
};

async function getResource(url) { // Возвращает Promise fetch-а. Async - внутри функции асинхронный код
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json(); //await - ждёт окончания promise
}

export {postData};
export {getResource};