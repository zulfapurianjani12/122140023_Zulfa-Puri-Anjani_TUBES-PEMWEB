import json
from pyramid.response import Response
from .models import User
from passlib.hash import pbkdf2_sha256

def register(request):
    try:
        data = request.json_body
        session = request.dbsession

        if session.query(User).filter_by(username=data['username']).first():
            return Response(json.dumps({'error': 'Username already exists'}), content_type='application/json', status=400)

        hashed_pw = pbkdf2_sha256.hash(data['password'])

        user = User(
            fullname=data['fullname'],
            username=data['username'],
            email=data['email'],
            password=hashed_pw
        )

        session.add(user)
        return Response(json.dumps({'message': 'User registered'}), content_type='application/json')
    except Exception as e:
        return Response(json.dumps({'error': str(e)}), content_type='application/json', status=500)

def login(request):
    try:
        data = request.json_body
        session = request.dbsession

        user = session.query(User).filter_by(username=data['username']).first()

        if user and pbkdf2_sha256.verify(data['password'], user.password):
            return Response(json.dumps({'message': 'Login successful'}), content_type='application/json')
        else:
            return Response(json.dumps({'error': 'Invalid credentials'}), content_type='application/json', status=401)
    except Exception as e:
        return Response(json.dumps({'error': str(e)}), content_type='application/json', status=500)
