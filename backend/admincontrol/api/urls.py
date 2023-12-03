from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .import views

urlpatterns = [
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('action/<int:pk>/', views.ToggleUserActiveStatus.as_view(),
         name='user-is-active'),
    path('edit/<int:pk>/', views.UserEditView.as_view(), name='edit-user'),

    path('reset-password/<int:pk>/',
         views.ResetPasswordView.as_view(), name='reset-password'),



    path('banners/', views.BannerListCreateView.as_view(), name='banner-create'),
    path('banners/<int:pk>/', views.BannerRetrieveUpdateDeleteView.as_view(),
         name='banner-retrieve-update-delete'),


    path('category/', views.CategoryCreateView.as_view(), name='category-create'),
    path('category-list/', views.CategoryListView.as_view(), name='category-list'),
    path('category/<int:pk>/', views.CategoryRetrieveUpdateDeleteView.as_view(),
         name='category-retrieve-update-delete'),


    path('post/', views.PostListCreateView.as_view(), name='post-create-list'),
    path('post-list-userbased/<int:user_id>/', views.PostList.as_view(), name='post-list'),
    path('post/action/<int:pk>/', views.PostToggleActionView.as_view(),
         name='post-toggle-action'),
    path('post/<int:pk>/', views.PostRetrieveUpdateDeleteView.as_view(),
         name='post-retrieve-update-delete'),

    path('box/', views.BoxListCreateView.as_view(), name='box-list-create'),
    path('box/<int:postId>/', views.BoxDeleteView.as_view(), name='box-remove'),

    path('plan/', views.PlanListCreateView.as_view(), name='plan-list-create'),
    path('plan/<int:pk>/', views.PlanRetrieveUpdateDeleteView.as_view(),
         name='paln-retrieve-update-delete'),


]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
