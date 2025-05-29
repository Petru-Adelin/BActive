from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Users
from .utils import encrypt, decrypt
from  django.core import serializers

import json


# Create your views here.

def login(request: HttpRequest):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username, password = data['username'], data['password']
            try:
                print(username, encrypt(password))
                user = Users.objects.get(name = username)
                if user is not None:
                    # check if the password is the same 
                    passw = decrypt(user.password)
                    if passw == password:
                        data = serializers.serialize('json', [user])
                        return HttpResponse('User is loged in, allowed ', status=404)
                    else:
                        return HttpResponse('Password is not matching...', status=404)
            except Users.DoesNotExist:
                return HttpResponse('Login failed due to entity not being present in the database...', status=404)
        except json.JSONDecodeError:
            return HttpResponse('Login failed due to request.body not being conformed...', status=404)


def signin(request: HttpRequest):
    if request.method == 'POST':

        try:
            data = json.loads(request.body)
            username, password, age, email = data['username'], data['password'], data['age'], data['email']
            user = Users(name=username, email=email, age=age, password = encrypt(password))
            user.save()
            return HttpResponse(f'New user with @email@ {email} has been added...', status = 202)
        except json.JSONDecodeError:
            return HttpResponse('The registration of the user has been aborted...', status=404)
    

# aquiring CSRF token for the post methods 
@ensure_csrf_cookie
def aquire_csrf(request: HttpRequest):
    return JsonResponse({"status": "cookie aquired"})



# Detele method for the User

def delete_user(request: HttpRequest):
    if request.method == 'DELETE':
        try:
            print('inside')
            data = json.loads(request.body)
            print(data)
            email = data['email']
            print(email)
            user = Users.objects.get(email=email)
            print(user)
            # user.delete()
            
            try:
                user.delete()
                return HttpResponse(f"The entry with the @email@ {email} has been deleted...", status= 202)
            except Users.DoesNotExist:
                raise Exception()
        except json.JSONDecodeError and Exception as e:
            print(e)
            return HttpResponse('Problem with parsing json...', status=404)

#filter by name
def filter_user(request: HttpRequest):
    if request.method == 'GET':
        try:
            data = json.loads(request.body)
            name = data['name']
            user = Users.objects.filter(name=name)
            data = serializers.serialize('json', user)
            return JsonResponse(data, safe=False)
        except json.JSONDecodeError:
            return HttpResponse('Problems in loading the json body...', status=404)
        

# util for verifying the encryption

def decry(request: HttpRequest):
    if request.method == 'GET':
        try:
            data = json.loads(request.body)
            name = data['name']
            user = Users.objects.filter(name=name).first()
            # binary format of the password
            if user:
                password = user.password
            else:
                raise Exception() 
            return JsonResponse({'passw': decrypt(password)})
        except json.JSONDecodeError and Exception:
            return HttpResponse('Problems in loading the json body...', status=404)