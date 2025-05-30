from pyramid.config import Configurator
from .setup import setup_db
from . import models
from . import auth

def main(global_config, **settings):
    config = Configurator(settings=settings)

    # DB Setup
    session_factory = setup_db(config)
    config.registry['dbsession_factory'] = session_factory
    config.add_request_method(lambda r: session_factory(), 'dbsession', reify=True)

    # Routes
    config.include('.routes')
    config.add_view(auth.register, route_name='register', renderer='json', request_method='POST')
    config.add_view(auth.login, route_name='login', renderer='json', request_method='POST')

    config.scan()
    return config.make_wsgi_app()
