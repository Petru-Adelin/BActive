from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from LandingPage.models import Stats
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.
@csrf_exempt
def weekly(request: HttpRequest):
    if request.method == 'POST':
        try:
            # get from front a body with the starting date and the end date and user_id
            data = json.loads(request.body)
            date1 = data['date1']
            date2 = data['date2']
            user_id = data['user_id']
            # retrieve using the equivalent of the between in django which is __range
            week_stats = Stats.objects.filter(timestamp__range=[date1, date2], user_id = user_id)
            data = serializers.serialize('json', week_stats)
            return JsonResponse(data, safe=False)
        except Exception as e:
            print(e)
            return HttpResponse('Error occured when filtering the year stats information', status=404)

@csrf_exempt
def yearly(request: HttpRequest):
    if request.method == 'POST':
        try:
            # get from front a body with the year in cause
            data = json.loads(request.body)
            year = data['year']
            user_id = data['user_id']
            year_stats = Stats.objects.filter(timestamp__year=year, user_id=user_id)
            data = serializers.serialize('json', year_stats)
            return JsonResponse(data, safe=False)
        except Exception as e:
            print(e)
            return HttpResponse('Error occured when filtering the year stats information', status=404)


