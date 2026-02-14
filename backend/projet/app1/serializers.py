from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.text import slugify
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.conf import settings

from .models import (
    User, ExerciseCategory, Exercise, RecipeCategory, Recipe,
    ProductCategory, Product, ProductImage, Cart, CartItem, NutritionalData
)

# Serializer pour User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'age', 'height', 'weight', 'goal', 'created_at']

# Serializer pour ExerciseCategory
class ExerciseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseCategory
        fields = ['id', 'name']

# Serializer pour Exercise
class ExerciseSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=ExerciseCategory.objects.all())

    class Meta:
        model = Exercise
        fields = ['id', 'title', 'category', 'difficulty', 'duration', 'image','image1', 'image2','video', 'description', 'benefits']

        def get_image(self, obj):
           if obj.image:
                return settings.MEDIA_URL + str(obj.image)
                return None

# Serializer pour RecipeCategory
class RecipeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeCategory
        fields = ['id', 'name']

# Serializer pour Recipe
class RecipeSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=RecipeCategory.objects.all())

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'category', 'difficulty', 'prep_time', 'image', 'description', 'calories', 'protein', 'carbs', 'fat', 'benefits']

# Serializer pour ProductCategory
class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name', 'description']

# Serializer pour Product
class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=ProductCategory.objects.all())

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'price', 'stock', 'description', 'image1', 'created_at', 'updated_at']

# Serializer pour ProductImage
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'image']

# Serializer pour Cart
class CartSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at']

# Serializer pour CartItem
class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'quantity', 'added_at']

class NutritionalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = NutritionalData
        fields = ['id', 'user', 'date', 'calories', 'protein', 'carbs', 'fat']

# Serializer pour l'inscription (Signup)
class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    name = serializers.CharField(required=False)  # Make name optional
    username = serializers.CharField(required=True)  # Add username field
    goal = serializers.ChoiceField(
        choices=['lose_weight', 'gain_muscle', 'maintain'],
        required=False,
        default='maintain'
    )

    class Meta:
        model = User
        fields = ['username', 'name', 'email', 'password', 'age', 'height', 'weight', 'goal']

    def validate_email(self, value):
        """ Vérifie si l'email est unique. """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Cet email est déjà utilisé.")
        return value

    def validate_username(self, value):
        """ Vérifie si le username est unique. """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Ce nom d'utilisateur est déjà utilisé.")
        return value

    def create(self, validated_data):
        # Use provided username instead of generating one
        user = User.objects.create_user(
            username=validated_data['username'],
            name=validated_data.get('name', validated_data['username']),  # Use username as name if not provided
            email=validated_data['email'],
            password=validated_data['password'],
            age=validated_data.get('age'),
            height=validated_data.get('height'),
            weight=validated_data.get('weight'),
            goal=validated_data.get('goal', 'maintain')  # Ensure goal has a default value
        )
        return user

# Serializer pour la connexion (Login)
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid email or password.")

            if not user.check_password(password):
                raise serializers.ValidationError("Invalid email or password.")
        
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")

        data['user'] = user
        return data

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("No user found with this email address.")
        return value
