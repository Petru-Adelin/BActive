from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Users
from .utils import encrypt, decrypt
from  django.core import serializers

import json


# Create your views here.

def base(request: HttpRequest): 
    if(request.method == 'GET'):
        return HttpResponse('We are in the Login page...')
    
    if request.method == 'POST':
        try:

            data = json.loads(request.body)
            username, password, age, email = data.get('username'), data.get('password'), data['age'], data['email']
            print(f"username: {username}\npassword: {password}\nage: {age}\nemail: {email}")
            user = Users(name=username, email=email, age=age, password = encrypt(password))
            # creating a user by mocking 
            user.save()

            return HttpResponse(f'New user with @email@ {email} has been added...', status = 202)
        except json.JSONDecodeError:
            return HttpResponse('Not good', status=404)        

@ensure_csrf_cookie
def aquire_csrf(request: HttpRequest):
    return JsonResponse({"status": "cookie aquired"})


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