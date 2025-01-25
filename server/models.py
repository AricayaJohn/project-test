# models.py

from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db

class ConventionArea(db.Model, SerializerMixin):
    __tablename__ = 'convention_areas'

    id = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String, nullable=False)
    venue = db.Column(db.String, nullable=False)

    conventions = db.relationship('Convention', backref='convention_area', cascade='all, delete-orphan')
    host_companies = association_proxy('conventions', 'host_company')

    serialize_rules = ('-conventions.convention_area',)

class HostCompany(db.Model, SerializerMixin):
    __tablename__ = 'host_companies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    industry = db.Column(db.String, nullable=False)

    conventions = db.relationship('Convention', backref='host_company')
    convention_names = association_proxy('conventions', 'convention_name')

    serialize_rules = ('-conventions.host_company',)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('HostCompany name cannot be empty')
        return name

    @validates('industry')
    def validate_industry(self, key, industry):
        if not industry:
            raise ValueError('Industry cannot be empty')
        return industry

class Convention(db.Model, SerializerMixin):
    __tablename__ = 'conventions'

    id = db.Column(db.Integer, primary_key=True)
    convention_name = db.Column(db.String, nullable=False)
    days = db.Column(db.Integer, nullable=False)

    convention_area_id = db.Column(db.Integer, db.ForeignKey('convention_areas.id'))
    host_company_id = db.Column(db.Integer, db.ForeignKey('host_companies.id'))

    serialize_rules = ('-convention_area.conventions', '-host_company.conventions')

    host_company = association_proxy('host_company_id', 'host_company')

    @validates('days')
    def validate_days(self, key, days):
        if not isinstance(days, int):
            raise ValueError('Days must be an integer')
        return days