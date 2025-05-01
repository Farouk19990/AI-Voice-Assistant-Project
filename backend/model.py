from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    call_id = db.Column(db.String(50),nullable= False)
    call_date = db.Column(db.Date, server_default=db.func.current_date())

    def __repr__(self):
        return f'<Patient {self.email}>'