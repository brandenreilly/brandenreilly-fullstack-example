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
    already_exists = Contact.query.filter_by(email=sent_contact["email"], uid=sent_contact["uid"]).first()
    if already_exists:
        return jsonify("CONTACT WITH THIS EMAIL ALREADY EXISTS"), 409
    else:
        new_contact = Contact(uid=sent_contact["uid"], full_name=sent_contact["full_name"], email=sent_contact["email"], address=sent_contact["address"], phone=sent_contact["phone"], relation=sent_contact["relation"])
        db.session.add(new_contact)
        db.session.commit()
        get_new_contact = Contact.query.filter_by(full_name=sent_contact["full_name"]).first()
        listed = get_new_contact.serialize()
        return jsonify(listed), 200

@api.route('/contacts/<uid>', methods=['GET'])
def handle_get_user_contacts(uid):
    filtered_contacts = Contact.query.filter_by(uid=uid)
    users_contacts = list(map(lambda x: x.serialize(), filtered_contacts))
    return jsonify(users_contacts), 200

@api.route('/contacts/get/<id>', methods=['GET'])
def handle_get_edit_user(id):
    contact_to_be_edited = Contact.query.filter_by(id=id).first()
    to_send = contact_to_be_edited.serialize()
    return jsonify(to_send), 200

@api.route('/contacts/edit/<id>', methods=['PUT'])
def handle_edit_user(id):
    sent_contact = request.json
    contact = Contact.query.filter_by(id=id).first()
    contact.full_name = sent_contact["full_name"]
    contact.email = sent_contact["email"]
    contact.address = sent_contact["address"]
    contact.phone = sent_contact["phone"]
    db.session.commit()
    new_contact = Contact.query.filter_by(id=id).first()
    to_send = new_contact.serialize()
    return jsonify(to_send), 200

@api.route('/contacts/delete/<uid>/<id>', methods=['DELETE'])
def handle_delete_contact(uid , id):
    find_contact = Contact.query.filter_by(id=id).first()
    db.session.delete(find_contact)
    db.session.commit()
    get_new_contacts_list = Contact.query.filter_by(uid=uid)
    listed = (list(map(lambda x: x.serialize(), get_new_contacts_list)))
    return jsonify(listed), 200
