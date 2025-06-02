from pyramid.config import Configurator
from .setup import setup_db
from . import models
from . import auth

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.add_route('create_review', '/api/reviews')
    config.add_route('get_reviews', '/api/reviews')
    config.add_route('update_review', '/api/reviews/{id}')
    config.add_route('delete_review', '/api/reviews/{id}')

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
