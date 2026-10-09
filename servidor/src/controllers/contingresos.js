export function formingreso(req, resp) {
    resp.render('ingresos');
}

export function nuevoingreso(req, resp) {
    resp.redirect('/ingresos');
}
