from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ExerciseViewSet,ExerciseCategoryViewSet,RecipeCategoryViewSet,RecipeViewSet,ProductCategoryViewSet,ProductViewSet,ProductImageViewSet,CartViewSet,CartItemViewSet,SignupView,LoginView,NutritionalDataViewSet, PasswordResetRequestView
from rest_framework.routers import SimpleRouter
from django.urls import path

#http://127.0.0.1:8000/app1/users
#http://127.0.0.1:8000/app1/exercises
#http://127.0.0.1:8000/app1/exercise-categories
#http://127.0.0.1:8000/app1/recipe-categories
#http://127.0.0.1:8000/app1/recipes
#http://127.0.0.1:8000/app1/product-categories
#http://127.0.0.1:8000/app1/products
#http://127.0.0.1:8000/app1/product-images
#http://127.0.0.1:8000/app1/carts
#http://127.0.0.1:8000/app1/cart-items
#http://127.0.0.1:8000/app1/signup
#http://127.0.0.1:8000/app1/login



router = SimpleRouter()

router.register(r'users', UserViewSet)
router.register(r'exercises', ExerciseViewSet)
router.register(r'exercise-categories', ExerciseCategoryViewSet)
router.register(r'recipe-categories', RecipeCategoryViewSet)
router.register(r'recipes', RecipeViewSet)
router.register(r'product-categories', ProductCategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'product-images', ProductImageViewSet)
router.register(r'nutritional', NutritionalDataViewSet)
router.register(r'carts', CartViewSet)
router.register(r'cart-items', CartItemViewSet)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),  # Manually define the signup URL
    path('login/', LoginView.as_view(), name='login'),    # Manually define the login URL
    path('request-password-reset/', PasswordResetRequestView.as_view(), name='request-password-reset'),
]

urlpatterns += router.urls
