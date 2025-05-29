from django.db import models
from Login.models import Users

# Create your models here.
class Stats(models.Model):
    active_minutes = models.IntegerField(default=0, null=False)
    calories = models.IntegerField(default=0, null=False)
    steps = models.IntegerField(default=0, null=False)
    workouts = models.IntegerField(default=0, null=False)
    # date in YYYY-MM-DD format
    timestamp = models.DateField(auto_now_add=True)
    # FK for the user in cause 
    user = models.ForeignKey(Users, on_delete=models.CASCADE)

    def __str__(self):
        return f"@instance@: {self.active_minutes}|{self.calories}|{self.steps}|{self.workouts}\n @time@: {self.timestamp}  @user@: {self.user}"



class Daily(models.Model):
    active_minutes = models.IntegerField(default=0, null=False)
    calories = models.IntegerField(default=0, null=False)
    steps = models.IntegerField(default=0, null=False)
    workouts = models.IntegerField(default=0, null=False)
    # FK for the user in cause 
    user = models.ForeignKey(Users, on_delete=models.CASCADE)

    def __str__(self):
        return f"@instance@: {self.active_minutes}|{self.calories}|{self.steps}|{self.workouts}\n @user@: {self.user}"
