var express = require('express')
var router = express.Router()
var admin = require('./models/admin')
var FBFunctions = require('./code/Fbfunctions')
var conn = require('./models/db/connection')
var partitionsBl = require('./models/BL/mainPartitionsBL')
var access_token = require('./models/messengerProfile/config')

router.use((req, res, next) => {
    admin.SetAdmin('Xiang', 'https://scontent.ftpe7-2.fna.fbcdn.net/v/t1.0-1/p40x40/59203844_2321267341228979_4969615553355317248_n.jpg?_nc_cat=111&_nc_ht=scontent.ftpe7-2.fna&oh=4ccd36ba803db363770d57e5e5324f45&oe=5DC4D2CA')
    next()
})

router.get('/', (req, res) => {
    res.render('index.html', {
        Admin: admin.GetAdmin(),
    })
})

router.get('/PersistMenu', (req, res) => {
    res.render('PersistMenu.html', {
        Admin: admin.GetAdmin(),
        Bots: [
            {
                name: '霸特Bot',
                bot_id: '1'
            }
        ]
    })
})

router.post('/PersistMenu', (req, res) => {
    var body = req.body.data
    switch (body.bot_id) {
        case '1':
            FBFunctions.InitializeFunctions(access_token.ACCESS_TOKEN)
            break;
    }
    var _actions = []
    body.actions.forEach(element => {
        switch (element.type) {
            case 'postback':
                var ac = require('./models/persistMenu').call_to_actions(element.type, element.title, element.payload, '', '')
                break
            case 'web_url':
                var ac = require('./models/persistMenu').call_to_actions(element.type, element.title, '', element.url, element.webview_height_ratio)
                break
        }
        _actions.push(ac)
    })
    var persistMenu = require('./models/persistMenu').PersistMenu(body.locale, body.composer_input_disabled, _actions)

    FBFunctions.CreatePersistMenu(persistMenu, (result) => {
        res.status(200).json(result)
    })
})

router.get('/GetStartedButton', (req, res) => {
    res.render('GetStartedButton.html', {
        Admin: admin.GetAdmin(),
        Bots: [
            {
                name: '霸特Bot',
                bot_id: '1'
            }
        ]
    })
})

router.post('/GetStartedButtons', (req, res) => {
    var body = req.body.data
    switch (body.bot_id) {
        case '1':
            FBFunctions.InitializeFunctions(access_token.ACCESS_TOKEN)
            break;
    }
    var getStartedButtons = require('./models/getStartedButtons').GetStartedButtons(body.payload)
    FBFunctions.ModifyGetStartedButtons(getStartedButtons, (result) => {
        res.status(200).json(result)
    })
})

router.get('/WelcomePage', (req, res) => {
    res.render('WelcomePage.html', {
        Admin: admin.GetAdmin(),
        Bots: [
            {
                name: '霸特Bot',
                bot_id: '1'
            }
        ]
    })
})

router.post('/ModifyWelcomePage', (req, res) => {
    var body = req.body.data
    switch (body.bot_id) {
        case '1':
            FBFunctions.InitializeFunctions(access_token.ACCESS_TOKEN)
            break;
    }
    var welcomePage = require('./models/welcomePage').GetWelcomePage(body.default, body.zh_TW)
    FBFunctions.ModifyWelcomePage(welcomePage, (result) => {
        res.status(200).json(result)
    })
})

router.get('/DomainWhitelist', (req, res) => {
    res.render('DomainWhitelist.html', {
        Admin: admin.GetAdmin(),
        Bots: [
            {
                name: '霸特Bot',
                bot_id: '1'
            }
        ]
    })
})

router.get('/AccountLinkingUrl', (req, res) => {
    res.render('AccountLinkingUrl.html', {
        Admin: admin.GetAdmin(),
        Bots: [
            {
                name: '霸特Bot',
                bot_id: '1'
            }
        ]
    })
})

router.post('/AccountLinkingUrl', (req, res) => {
    var body = req.body.data
    switch (body.bot_id) {
        case '1':
            FBFunctions.InitializeFunctions(access_token.ACCESS_TOKEN)
            break;
    }
    var accountLinkUrlModel = require('./models/accountLinkUrl').GetAccountLintUrl(body.account_link_url)
    FBFunctions.ModifyAccountLinkUel(accountLinkUrlModel, (result) => {
        res.status(200).json(result)
    })
})

router.get('/AccountLink', (req, res) => {
    res.render('AccountLink.html', {
        Admin: admin.GetAdmin(),
        Bots: [
            {
                name: '霸特Bot',
                bot_id: '1'
            }
        ]
    })
})

router.get('/Record', (req, res) => {
    res.render('Record.html', {
        Admin: admin.GetAdmin(),
        Bots: [
            {
                name: '霸特Bot',
                bot_id: '1'
            }
        ]
    })
})

router.get('/Equipments', (req, res) => {

    partitionsBl.GetMainPartitions(conn,
        (partitions) => {
            res.render('Equipments.html', {
                Admin: admin.GetAdmin(),
                Bots: [
                    {
                        name: '霸特Bot',
                        bot_id: '1'
                    }
                ],
                mainPartitions: partitions
            })
        },
        (err) => {
            res.status(500).send(err)
        })
})

router.get('/GetSubPartitions', (req, res) => {
    partitionsBl.GetSubPartitions(conn, req.query['p'],
        (subPartitions) => {
            res.status(200).send({ code: 1, data: subPartitions })
        },
        (err) => {
            res.status(200).send({ code: -1 })
        })
})

router.get('/GetEquipments', (req, res) => {
    partitionsBl.GetEquipments(conn, req.query['g'],
        (equipments) => {
            res.status(200).send({ code: 1, data: equipments })
        },
        (err) => {
            res.status(200).send({ code: -1 })
        })
})

router.delete('/DeleteEquipment', (req, res) => {
    partitionsBl.DeleteEquipment(conn, req.body.pid,
        (result) => {
            res.status(200).send({ code: 1 })
        },
        (err) => {
            res.status(200).send({ code: -1 })
        })
})

router.post('/ModifyEquipment', (req, res) => {
    partitionsBl.ModifyEquipment(conn, req.body,
        (result) => {
            res.status(200).send({ code: 1 })
        },
        (err) => {
            res.status(200).send({ code: -1 })
        })
})

router.post('/CreateEquipment', (req, res) => {
    partitionsBl.CreateEquipment(conn, req.body,
        (result) => {
            res.status(200).send({code:1})
         },
        (err) => { 
            res.status(200).send({code:-1})
        }
    )    
})

router.get('/Test/a/b', (req, res) => {
    console.log('get')
})

module.exports = router