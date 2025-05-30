from pyramid.view import view_config
from pyramid.response import Response
from .models import DBSession, User
import json

@view_config(route_name='register', request_method='POST', renderer='json')
def register(request):
    try:
        data = request.json_body

        # Validasi sederhana
        if not all(k in data for k in ('full_name', 'username', 'email', 'password')):
            return {'status': 'error', 'message': 'Missing required fields'}

        new_user = User(
            full_name=data['full_name'],
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        DBSession.add(new_user)

        return {'status': 'success', 'message': 'User registered successfully'}

    except Exception as e:
        return {'status': 'error', 'message': str(e)}
