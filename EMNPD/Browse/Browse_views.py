from django.shortcuts import render

# Create your views here.

def Browse(request):
    return render(request, 'Browse.html')

