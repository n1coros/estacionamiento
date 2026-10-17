export function formsalidas(req, resp) {
    resp.render('salidas');
}

export function nuevasalida(req, resp) {
    resp.redirect('/salidas');
}