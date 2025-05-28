from django.db import models

# Create your models here.
class Users(models.Model):
    
    # MUST HAVE THE SAME SIGNITURE AS THE TABLE IN THE DB
    name = models.CharField(max_length=255, null=False)
    email = models.CharField(max_length=255, null=False)
    password = models.BinaryField(max_length=1024, null=False)
    age = models.IntegerField(default=15)

    # class Meta:
    #     db_table= 'users'      #enforce the use of the preexisting table 'users'

    def delete(self, *args, **kwrgs):
        super().delete(*args, **kwrgs)


    def __str__(self):
        return self.name