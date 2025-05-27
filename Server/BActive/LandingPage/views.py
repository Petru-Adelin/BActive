from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

# Create your views here.
def base(request: HttpRequest):
    if(request.method == 'GET'):
        return HttpResponse('We are in the Home page')
    
