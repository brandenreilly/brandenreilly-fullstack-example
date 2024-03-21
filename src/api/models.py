from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    #relation
    contacts = db.relationship('Contact', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(User.id))
    full_name = db.Column(db.String(120))
    email = db.Column(db.String(120))
    address = db.Column(db.String(120))
    phone = db.Column(db.String(120))

    def serialize(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "full_name": self.full_name,
            "email": self.email,
            "address": self.address,
            "phone": self.phone,
        }