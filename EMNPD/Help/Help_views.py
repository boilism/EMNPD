from django.shortcuts import render

# Create your views here.
def Help(request):
    return render(request, 'Help.html')
