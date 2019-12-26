const slugs = {
    home: '/',
    users: '/users',
    createUser: '/create-user'
}

const reqHendle = (req, res) => {
    const bodyOpen = `
        <html>
            <head>
                <title>Home task</title>
            </head>
            <body>
    `;

    const bodyClose = `
            </body>
        </html>
    `;

    
    if ( req.url === slugs.users ) {
        res.write(bodyOpen)

        res.write(`
            <a href="${slugs.home}"> home page </a>
            <ul>
                <li>user1</li>
                <li>user2</li>
                <li>user3</li>
            </ul>
        `)
        res.write(bodyClose)

        res.end();
    } else if( req.url === slugs.createUser && req.method === "POST" ){
        const dataReq = [];
        
        req.on('data', (data) => {
            dataReq.push(data)
        });

        
        req.on('end', () => {

            const parcedReq = Buffer.concat(dataReq).toString();           

            const [field, value] = parcedReq.split('=');

            console.log(value);
        })        


        res.writeHead(302, {
            'Location': '/'
        });
        
        
        res.end();
    }  else {
        res.write(bodyOpen)
        res.write(`
            
            <a href="${slugs.users}"> users page </a>
            <h1>Hellow</h1>
            <form action="/create-user" method="POST">
                <input type="text" name="username">
                <input type="submit" value="sent">
            </form>
        `)
        res.write(bodyClose)
    
        res.end();
    }
};


module.exports = reqHendle;