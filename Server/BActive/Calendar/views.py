from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.core import serializers
from LandingPage.models import Stats
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
@csrf_exempt
def getday(request: HttpRequest):
    if request.method == 'POST':
        # the body must have a field called date and user_id 
        # the format of the date should be 'YYYY-MM-DD'
        print(request.body)
        data = json.loads(request.body)
        date = data['date']
        user_id = data['user_id']
        try:
            dayly_stats = Stats.objects.get(user_id=user_id, timestamp=date)
            data = serializers.serialize('json', [dayly_stats])
            return JsonResponse(data, safe = False)
        except Stats.DoesNotExist:
            return HttpResponse('Error in finding the dayly stats...', status=404)
            