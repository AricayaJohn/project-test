#!/usr/bin/env python3
from app import app
from models import db, Convention, ConventionArea, HostCompany

def clear_data():
    Convention.query.delete()
    ConventionArea.query.delete()
    HostCompany.query.delete()
    db.session.commit()

def add_convention_areas():
    area1 = ConventionArea(location_name='Los Angeles Convention', venue='Staples Center')
    area2 = ConventionArea(location_name='San Francisco Convention', venue='Oracle Arena')

    db.session.add_all([area1, area2])
    db.session.commit()

def add_host_companies():
    company1 = HostCompany(name='TechCorp', industry='Technology')
    company2 = HostCompany(name='Foodies Inc.', industry='Food & Beverage')

    db.session.add_all([company1, company2])
    db.session.commit()

def add_conventions():
    convention1 = Convention(convention_name='Tech Conference 2025', days=3, convention_area_id=2, host_company_id=1)
    convention2 = Convention(convention_name='Food Convention Festival', days=5, convention_area_id=1, host_company_id=2)
    convention3 = Convention(convention_name='Movie Award Convention', days=1, convention_area_id=1, host_company_id=2)

    db.session.add_all([convention1, convention2, convention3])
    db.session.commit()

def seed():
    print("Clearing data...")
    clear_data()

    print("Seeding convention areas...")
    add_convention_areas()

    print("Seeding host companies...")
    add_host_companies()

    print("Seeding conventions...")
    add_conventions()

if __name__ == '__main__':
    with app.app_context():
        seed()
