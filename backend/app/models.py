from sqlalchemy import Column, Integer, Text, String, DateTime
from sqlalchemy.sql import func
from .meta import Base

class Review(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True)
    user_id = Column(String, nullable=False)
    cafe_name = Column(String, nullable=False)
    review = Column(Text, nullable=False)
    rating = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
