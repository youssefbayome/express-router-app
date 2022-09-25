const express = require('express');
const app = express();
const port = 4000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/public', express.static('public'))

const workingHours = (req, res, next) => {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    const offdays = [0, 6];
    const onHours = [9, 10, 11, 12, 13, 14, 15, 16];
    if (offdays.includes(day)) {
        res.redirect("/on-vacation");
    } else if (!onHours.includes(hour)) {
        res.redirect("/after-hours");
    }
    next();
}
app.get('/on-vacation', (req, res) => {
    res.render('vacation', {
        img: "public/images/notopen.png"
    })
})

app.get('/after-hours', (req, res) => {
    res.render('afterhours', {
        img: "public/images/afterhours.jpg"
    })
})

app.use(workingHours);

app.get('/', (req, res) => {
    res.render('home', { img: "public/images/home.jpg" })
});
app.get('/our-services', (req, res) => {
    res.render('service', { img: "public/images/service.jpg" })
});
app.get('/contact-us', (req, res) => {
    res.render('contact', { img: "public/images/contact.jpg" })
});


app.listen(port, () => {
    console.log("The server is running, " + port);
});