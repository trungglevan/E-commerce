class SiteController {
    home(req, res) {
        res.render('home')
    }

    about(req, res) {
        res.render('about');
    }

    login(req, res) {
        res.render('login');
    }

    register(req, res) {
        res.render('register');
    }

    admin(req, res) {
        res.send("admin");
    }
}

export default new SiteController;
