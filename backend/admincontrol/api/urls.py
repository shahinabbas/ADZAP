from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('action/<int:pk>/', views.ToggleUserActiveStatus.as_view(), name='user-is-active'),
    path('edit/<int:pk>/', views.UserEditView.as_view(), name='edit-user'),
    path('banners/', views.BannerListCreateView.as_view(), name='banner-create'),
    path('banners/<int:pk>/', views.BannerRetrieveUpdateDeleteView.as_view(),
         name='banner-retrieve-update-delete'),
    path('category/', views.CategoryCreateView.as_view(), name='category-create'),
    path('category-list/', views.CategoryListView.as_view(), name='category-list'),
    path('category/<int:pk>/', views.CategoryRetrieveUpdateDeleteView.as_view(),
         name='category-retrieve-update-delete'),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
