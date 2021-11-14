let express = require('express')
let app = express()
let session = require('express-session')
let flash = require('express-flash')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')


app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cookieParser("Roubo de carga de cookies"))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600 * 24 * 60 * 60 * 1000 }
}))

app.use(flash())

app.get('/', (req, res) => {
    let error = req.flash('error')
    let success = req.flash('success')
    let dados = req.flash('dados')

    // dados.email = (dados.email) ? dados.email : ''
    // dados.name = (dados.name) ? dados.name : ''
    // dados.pontos = (dados.pontos) ? dados.pontos : ''

    res.render('index', { error: error, success: success, dados: dados })
})

app.post('/form', (req, res) => {
    let { email, nome, pontos } = req.body

    if(email == undefined || email == '') {
        req.flash('error', 'Email não informado')
        res.redirect('/')
    } else if(nome == undefined || nome == '' || nome.length < 3) {
        req.flash('error', 'Nome não informado')
        res.redirect('/')
    } else if(pontos == undefined || pontos == '') {
        req.flash('error', 'Pontos não informados')
        res.redirect('/')
    } else {
        req.flash('success', 'Dados salvos com sucesso')
        res.redirect('/')
    }

    req.flash('dados', { email, nome, pontos })
    req.flash('info', 'Success!')
    res.redirect('/')
})

app.listen(3000, (req, res) => {
    console.log('listening on 3000')
})