from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Users
from .utils import encrypt, decrypt
from  django.core import serializers
from django.middleware.csrf import get_token
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

import json


# Create your views here.
@csrf_exempt
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
                        return JsonResponse({
                            'status': 200,
                            'message': 'User is loged in, allowed to advance'
                        })
                    else:
                        return JsonResponse({
                            'status': 404,
                            'message': 'Password is not matching...'
                        })
            except Users.DoesNotExist:
                return JsonResponse({
                            'status': 404,
                            'message': 'Login failed due to entity not being present in the database...'
                        })
        except json.JSONDecodeError:
            return JsonResponse({
                            'status': 404,
                            'message': 'Login failed due to request.body not being conformed...'
                        })

    else:
        return JsonResponse({
            'status': 403,
            'message': 'Forbidden HTTP request, only POST requests are allowed on this URL'
        })

@csrf_exempt
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
@require_http_methods(['GET'])
def aquire_csrf(request: HttpRequest):
    csrf = request.COOKIES.get('csrftoken')
    print(csrf)
    return JsonResponse({'token': csrf})



# Detele method for the User

def delete_user(request: HttpRequest):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body)
            email = data['email']
            user = Users.objects.get(email=email)
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