from pyramid.view import view_config
from pyramid.response import Response
from .models import DBSession, User, Review  # pastikan model Review sudah dibuat di models.py
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

# ✅ Endpoint untuk membuat review
@view_config(route_name='create_review', request_method='POST', renderer='json')
def create_review(request):
    try:
        data = request.json_body

        required_fields = ('user_id', 'cafe_name', 'review', 'rating')
        if not all(field in data for field in required_fields):
            return {'status': 'error', 'message': 'Missing review fields'}

        new_review = Review(
            user_id=data['user_id'],
            cafe_name=data['cafe_name'],
            review=data['review'],
            rating=int(data['rating'])
        )

        DBSession.add(new_review)

        return {
            'status': 'success',
            'message': 'Review berhasil disimpan.',
            'data': {
                'user_id': new_review.user_id,
                'cafe_name': new_review.cafe_name,
                'review': new_review.review,
                'rating': new_review.rating
            }
        }

    except Exception as e:
        return {'status': 'error', 'message': str(e)}


# ✅ UPDATE Review (by ID)
@view_config(route_name='update_review', request_method='PUT', renderer='json')
def update_review(request):
    try:
        data = request.json_body
        review_id = request.matchdict.get('id')

        review = DBSession.query(Review).filter(Review.id == review_id).first()
        if not review:
            return {'status': 'error', 'message': 'Review not found'}

        # Update hanya jika field dikirim
        review.review = data.get('review', review.review)
        review.rating = int(data.get('rating', review.rating))

        return {
            'status': 'success',
            'message': 'Review updated successfully',
            'data': {
                'id': review.id,
                'review': review.review,
                'rating': review.rating
            }
        }

    except Exception as e:
        return {'status': 'error', 'message': str(e)}

# ✅ DELETE Review (by ID)
@view_config(route_name='delete_review', request_method='DELETE', renderer='json')
def delete_review(request):
    try:
        review_id = request.matchdict.get('id')
        review = DBSession.query(Review).filter(Review.id == review_id).first()

        if not review:
            return {'status': 'error', 'message': 'Review not found'}

        DBSession.delete(review)
        return {'status': 'success', 'message': 'Review deleted successfully'}

    except Exception as e:
        return {'status': 'error', 'message': str(e)}