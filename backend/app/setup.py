from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from .models import Base

def setup_db(config):
    engine = engine_from_config(config.get_settings(), 'sqlalchemy.')
    Base.metadata.create_all(engine)
    return sessionmaker(bind=engine)
