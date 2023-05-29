export async function authenticationToken(request, response, next, auth) {
    const jwt = request.headers.authorization;
    if (!jwt) {
        response.status(401).json({ message: 'Usuário não autorizado.' });
        return;
    }

    let decodedIdToken = '';
    try {
        let decodedIdToken = await auth.verifyIdToken(jwt, true);
    } catch (e) {
        response.status(401).json({ message: 'Usuário não autorizado.' });
        return;
    }

    request.user = {
        uid: decodedIdToken.sub
    }

    next();
}