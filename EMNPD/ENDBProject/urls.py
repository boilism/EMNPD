"""ENDBProject URL ConfigurationNaturalProduct

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
#from django.contrib import admin
from django.urls import path
from NaturalProduct import NPs_views
from Species import Species_views
from Target import Target_views
from Search import Search_views
from Browse import Browse_views
from Download import Download_views
from Home import Home_views
from Help import Help_views

from django.conf import settings
from django.conf.urls.static import static







urlpatterns = [
    #path('admin/', admin.site.urls),
    path('emnpd/species/<str:ens_id>/', Species_views.species_detail, name='species_detail'),
    path('emnpd/species/<str:ens_id>/species_np_content_json/', Species_views.species_np_content_json, name='species_np_content_json'),


    path('emnpd/naturalproducts/<str:enc_id>/', NPs_views.naturalproduct_detail),
    path('emnpd/naturalproducts/<str:enc_id>/species_source_json/', NPs_views.species_source_json, name='species_source_json'),
    path('emnpd/naturalproducts/<str:enc_id>/target_active_json/', NPs_views.target_active_json, name='target_active_json'),
    path('emnpd/naturalproducts/<str:enc_id>/target_inactive_json/', NPs_views.target_inactive_json, name='target_inactive_json'),
    path('emnpd/naturalproducts/<str:enc_id>/np_content_json/', NPs_views.np_content_json, name='np_content_json'),
    path('emnpd/naturalproducts/<str:enc_id>/species_source_tree.json', NPs_views.species_source_tree),


    path('emnpd/target/cell_line/<str:ent_id>/', Target_views.Target_Cell_Line_detail, name='target_detail'),
    path('emnpd/target/<str:ent_id>/target_active_json/', Target_views.target_active_json, name='target_detail'),
    path('emnpd/target/<str:ent_id>/target_inactive_json/', Target_views.target_inactive_json, name='target_detail'),
    path('emnpd/target/protein/<str:ent_id>/', Target_views.Target_Protein_detail, name='target_detail'),
    path('emnpd/target/species/<str:ent_id>/', Target_views.Target_Species, name='target_detail'),


    path('emnpd/search/', Search_views.Search),
    path('emnpd/search_nps/', Search_views.Search_NPs),
    path('emnpd/search_endophyte/', Search_views.Search_endophyte),
    path('emnpd/search_target/', Search_views.Search_target),
    path('emnpd/search_bioactivity/', Search_views.Search_bioactivity),
    path('emnpd/search_nps_similarity/', Search_views.NPs_Similarity),

    path('emnpd/browse/', Browse_views.Browse),

    path('emnpd/help/', Help_views.Help),

    path('emnpd/download/', Download_views.Download),

    path('emnpd/', Home_views.Home),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


