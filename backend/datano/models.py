from django.db import models

# Create your models here.
class Instruction(models.Model) :
        taskId = models.TextField()
        collection = models.TextField(default=1)
        createdAt = models.TextField(default=' ')
        completedAt = models.TextField(default=' ')
        status = models.TextField(default=' ')
        instru = models.TextField(default=' ')
        typeInstru = models.TextField(default='Instru')
        urgency = models.TextField(default='now') 
        api_key = models.TextField(default=' ')
        


        def _str_(self):
                return self.istru 


Instruction.raw('DELETE FROM datano_instruction')



# py manage.py makemigrations datano
# py manage.py migrate datano 
