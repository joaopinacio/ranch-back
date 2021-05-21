var router = require('express').Router();
const middlewareFunctions = require('../middleware/Middleware.js');
const Item = require('../../../model/Item.js'); // import
const ItemsController = require('../../../controller/Item.js'); // import

const ItemController = new ItemsController(Item);
require('express-group-routes');

router.group((router) => {
    router.use(middlewareFunctions.auth);    // * authorize()

    // Test Get
    router.get('/test', (req, res) => {
        res.json({
            status: true,
            message: 'Hello world',
            userLogged: req.session.user
        });
    });

    router.post('/findByPk', async (req, res) => {
        await ItemController.getById(req.body.cdItem).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/findByWhere', async (req, res) => {
        const where = req.body;
        await ItemController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await ItemController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/create', async (req, res) => {
        await ItemController.create(req.body).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/createAll', async (req, res) => {
        let items = 0;
        await req.body.forEach(async element => {
            await ItemController.create(element).then(response => {
                statusCode = response.statusCode;
                data = response.data;
                items++;
            });
            if(items == req.body.length){
                res.status(statusCode)
                res.json(data)
            }
        });
    });

    router.post('/update', async (req, res) => {
        await ItemController.update(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    router.post('/delete', async (req, res) => {
        await ItemController.delete(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

})

module.exports = router;