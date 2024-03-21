"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Contact
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['GET'])
def handle_list_user():
    all_users = User.query.all()
    list_all = list(map(lambda x: x.serialize(), all_users))
    return jsonify(list_all), 200

@api.route('/getuser', methods=['POST'])
def handle_get_user():
    user_info = request.json
    is_user = User.query.filter_by(email=user_info["email"]).first()
    if is_user:
        if user_info["password"] == is_user.password:
            verified = is_user.serialize()
            return jsonify(verified), 200
        else:
            return jsonify("INCORRECT PASSWORD"), 403
    else:
        return jsonify("EMAIL NOT REGISTERED"), 401

@api.route('/createuser', methods=['POST'])
def handle_create_user():
    user_info = request.json
    email_not_valid = User.query.filter_by(email=user_info["email"]).first()
    if email_not_valid:
        return jsonify("EMAIL ALREADY IN USE"), 409
    else:
        new_user = User(email=user_info["email"], password=user_info["password"], is_active=user_info["is_active"])
        db.session.add(new_user)
        db.session.commit()
        find_new_user = User.query.filter_by(email=user_info["email"]).first()
        get_user_info = find_new_user.serialize()
        return jsonify(get_user_info), 200

@api.route('/contacts', methods=['GET'])
def handle_get_all_contacts():
    all_contacts = Contact.query.all()
    list_all = list(map(lambda x: x.serialize(), all_contacts))
    return jsonify(list_all), 200

@api.route('/createcontact', methods=['POST'])
def handle_create_contact():
    sent_contact = request.json
    new_contact = Contact(uid=sent_contact["uid"], full_name=sent_contact["full_name"], email=sent_contact["email"], address=sent_contact["address"], phone=sent_contact["phone"])
    db.session.add(new_contact)
    db.session.commit()
    get_new_contact = Contact.query.filter_by(full_name=sent_contact["full_name"]).first()
    listed = get_new_contact.serialize()
    return jsonify(listed), "201 Contact Created"

@api.route('/contacts/<uid>', methods=['GET'])
def handle_get_user_contacts(uid):
    filtered_contacts = Contact.query.filter_by(uid=uid)
    users_contacts = list(map(lambda x: x.serialize(), filtered_contacts))
    return jsonify(users_contacts), 200