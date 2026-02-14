from django.contrib import admin

# Register your models here.
from .models import User, Exercise, ExerciseCategory, RecipeCategory, Recipe, ProductCategory, Product, ProductImage, Cart, CartItem

admin.site.register(User)
admin.site.register(Exercise)
admin.site.register(ExerciseCategory)
admin.site.register(RecipeCategory)
admin.site.register(Recipe)
admin.site.register(ProductCategory)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Cart)
admin.site.register(CartItem)



